<?php

namespace Biz;

use AppBundle\Common\ArrayToolkit;
use Codeages\Biz\Framework\Context\Biz;
use Monolog\Logger;
use Monolog\Handler\StreamHandler;

abstract class AbstractCopy
{
    private $logger;

    protected $copyChain;

    protected $biz;

    private $preCopyResult;

    private $doCopyResult;

    public function __construct(Biz $biz, $copyChain)
    {
        $this->biz = $biz;
        $this->setCopyChain($copyChain);
    }

    protected function getLogger($name)
    {
        if ($this->logger) {
            return $this->logger;
        }

        $this->logger = new Logger($name);
        $this->logger->pushHandler(new StreamHandler($this->biz['log_directory'].'/service.log', Logger::DEBUG));

        return $this->logger;
    }

    final public function copy($source, $options)
    {
        $this->preCopyResult = $this->preCopy($source, $options);
        $this->doCopyResult = $this->doCopy($source, $options);
        $this->afterCopy($source, $options);
    }

    abstract public function preCopy($source, $options);

    abstract public function doCopy($source, $options);

    function afterCopy($source, $options)
    {
        $currentNode = $this->getCurrentNodeName();
        $copyChain =  $this->getCopyChain();
        $childrenNodes = $this->getChildrenNodes($currentNode, $copyChain);

        foreach ($childrenNodes as $childrenNode) {
            $CopyClass = $childrenNode['class'];
            $copyClass = new $CopyClass();
            $copyClass->setCopyChain($childrenNode);
            $copyClass->copy($source, $options);
        }
    }

    protected function getCurrentNodeName()
    {
        $className = explode( '\\', get_class($this));
        $className = end($className);
        $className = str_replace('Copy', '', $className);

        return strtolower(preg_replace('/([a-z])([A-Z])/', "$1" . '-' . "$2", $className));
    }

    /**
     * Entity中待copy的字段列表
     *
     * @return array
     */
    abstract protected function getFields();

    protected function getCurrentNode()
    {
        $name = $this->getCurrentNodeName();
        $copyChain = $this->getCopyChain();

        return $copyChain[$name];
    }

    protected function getChildrenNodes($currentNode, $chains)
    {
        if (empty($chains)) {
            return array();
        }

        foreach ($chains as $name => $chain) {
            if ($name == $currentNode) {
                if (!empty($chain['children'])) {
                    return $chain['children'];
                }
            } elseif (!empty($chain['children'])) {
                return $this->getChildrenNodes($currentNode, $chain['children']);
            }
        }

        return array();
    }

    protected function processChainsDoClone($chains, $source, $options)
    {
        foreach ($chains as  $currentNode) {
            $class = new $currentNode['class']($this->biz);
            $class->copy($source, $options);
        }
    }

    protected function getCopyChain()
    {
        return $this->copyChain;
    }

    private function setCopyChain($copyChain)
    {
        $this->copyChain = $copyChain;
    }
}
