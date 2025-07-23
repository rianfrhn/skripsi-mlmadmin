import React, { useRef, useEffect, useMemo } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import * as d3 from 'd3-force';

/**
 * GraphComponent
 * Props:
 *   data: { nodes: Array<{id: any}>, links: Array<{ source: any, target: any }> }
 *   weights: Record<string|number, number>  // centrality weights per node id
 *
 * Renders a force-directed graph where node sizes, link distances, and repulsion are driven by provided weights.
 */
export default function GraphComponent({ data, weights = {}, selectedNodeId = null }) {
  const fgRef = useRef();
  useEffect(() => {
    const fg = fgRef.current;
    if (!fg || !selectedNodeId) return;
    const nodeObj = data.nodes.find(n => n.id === selectedNodeId);
    if (nodeObj && nodeObj.x != null && nodeObj.y != null) {
      fg.centerAt(nodeObj.x, nodeObj.y, 500);
      fg.zoom(2, 500);
    }
    
    //fg.redraw();
  }, [selectedNodeId, data]);

  //cari terpenting dari weight
  const importantNodeId = useMemo(() => {
    if (Object.keys(weights).length == 0) return null;
    let maxId = data.nodes[0]?.id;
    data.nodes.forEach(n => {
      if ((weights[n.id] || 0) > (weights[maxId] || 0)) maxId = n.id;
    });
    return maxId;
  }, [data, weights]);

  //update force dari graf
  useEffect(() => {
    const fg = fgRef.current;
    if (!fg) return;

    // 1) Update charge strength: heavier nodes repel more, light nodes a bit less
    fg.d3Force('charge').strength(n => -((weights[n.id] || 0) * 100 + 1));

    // 2) Update link distance: links between high-weight nodes pull tighter
    fg.d3Force('link')
      .distance(link => {
        const w1 = weights[link.source.id] || 0;
        const w2 = weights[link.target.id] || 0;
        // base distance 50, minus up to 40 if both heavy
        return 50 - Math.min(w1, w2) * 40;
      })
      .strength(0.1);

    // 3) (Re)center force
    fg.d3Force('center', d3.forceCenter(0, 0).strength(0.05));

    // Kick off a single alpha restart to apply new forces smoothly
    fg.d3ReheatSimulation();
  }, [weights, data]);

  // Center and zoom on prominent node once layout stabilizes
  useEffect(() => {
    const fg = fgRef.current;
    if (!fg || !data.nodes.length) return;
    setTimeout(() => {
      const nodeObj = data.nodes.find(n => n.id === importantNodeId);
      if (nodeObj && nodeObj.x != null && nodeObj.y != null) {
        fg.centerAt(nodeObj.x, nodeObj.y, 1000);
        fg.zoom(2, 1000);
      }
    }, 500);
  }, [importantNodeId, data]);

  return (
    <ForceGraph2D
      ref={fgRef}
      graphData={data}
      nodeLabel="agent_name"
      nodeVal={node => (weights[node.id] || 0) * 100 || 1}
      nodeRelSize={8}
      nodeCanvasObjectMode={() => 'replace'}
      nodeCanvasObject={(node, ctx, globalScale) => {
        const weight = weights[node.id] || 0;
        const radius = (Math.sqrt(weight) * 8) + 4;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
        
       const isSelected = node.id === selectedNodeId;
       ctx.fillStyle = isSelected
         ? 'limegreen'
          : node.id === importantNodeId
            ? 'red'
            : 'steelblue';
        ctx.fill();
        const label = `${node.id.toString()}. ${node.agent_name}`;
        const fontSize = 12 / globalScale;
        ctx.font = `${fontSize}px Sans-Serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#777';
        ctx.fillText(label, node.x, node.y + radius + fontSize);
      }}
      linkDirectionalArrowLength={6}
      linkDirectionalArrowRelPos={1}
      linkDirectionalArrowColor={() => '#999'}
      linkWidth={link => (link.source.id === importantNodeId || link.target.id === importantNodeId ? 3 : 1)}
      linkColor={link => (link.source.id === importantNodeId || link.target.id === importantNodeId ? '#444' : '#bbb')}
      linkOpacity={link => (link.source.id === importantNodeId || link.target.id === importantNodeId ? 0.8 : 0.2)}
      width={800}
      height={600}
    />
  );
}
