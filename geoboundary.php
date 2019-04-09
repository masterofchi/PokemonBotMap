<?php

class GeoBoundaryEdge
{
    private $lonStart;
    private $latStart;
    private $lonEnd;
    private $latEnd;

    public function __construct($startPoint, $endPoint)
    {
        $this->lonStart = $startPoint[0];
        $this->latStart = $startPoint[1];
        $this->lonEnd = $endPoint[0];
        $this->latEnd = $endPoint[1];
    }

    public function isPointLeftOfEdge($lon, $lat)
    {
        return (($this->lonEnd - $this->lonStart) * ($lat - $this->latStart)) - (($lon - $this->lonStart) * ($this->latEnd - $this->latStart)) >= 0;
    }
}

function getItemsInBoundary($items, $boundary)
{
    // IMPORTANT! The edges need to form a closed polygon - the endPoint of the last edge needs to be the start point of the first
    // IMPORTANT! The edges need to be defined in counter clockwise direction for this to work
    $edges = [
        new GeoBoundaryEdge($boundary->upperLeft, $boundary->lowerLeft),
        new GeoBoundaryEdge($boundary->lowerLeft, $boundary->lowerRight),
        new GeoBoundaryEdge($boundary->lowerRight, $boundary->upperRight),
        new GeoBoundaryEdge($boundary->upperRight, $boundary->upperLeft)
    ];

    return array_values(array_filter($items, function ($item) use ($edges) {
        $itemWithinBoundary = true;

        // if the given point is on the left side of every edge, the point resides within the boundary
        foreach ($edges as $edge) {
            $itemWithinBoundary = $edge->isPointLeftOfEdge($item['lon'], $item['lat']) && $itemWithinBoundary;
        }

        return $itemWithinBoundary;
    }));
}