import React from 'react';
import API from '../helpers/APIConnector';
import GraphComponent from '../components/GraphComponent';
import SegmentedToggle from '../components/SegmentedToggle';
const Laporan = () => {
  const [graphData, setGraphData] = React.useState(null);
  const centralityOptions = [
    { label: 'Tidak ada',   value: ''   },
    { label: 'Sentralitas Derajat', value: 'degree_centrality' },
    { label: 'Sentralitas Keperantaraan',  value: 'betweenness_centrality'  },
    { label: 'Sentralitas Kedekatan',  value: 'closeness_centrality'  },
    { label: 'Sentralitas Eigenvector',  value: 'eigenvector_centrality'  },
    { label: 'Pagerank',  value: 'pagerank'  },
  ];
  const [centralityMode, setCentralityMode] = React.useState(centralityOptions[0].value);
  const [weights, setWeights] = React.useState({});
  React.useEffect(() => {
    API.get("/centrality/get_graph")
      .then(data => {
        console.log("🎉 centrality data", data);
        setGraphData(data);
      })
    .catch(err => console.error(err));
  }, []);


  function setCentrality(url){
    API.get("/centrality/"+url).then(
      data=>{
        
        const rawValues = Object.values(data);
        const maxRaw = rawValues.length
          ? Math.max(...rawValues)
          : 0;

        const divisor = maxRaw || 1;

        const normalized = Object.fromEntries(
          Object.entries(data).map(([nodeId, w]) => [
            nodeId,
            w / divisor
          ])
        );
        setWeights(normalized)
      }
    ).catch(err=>console.error(err))
    setCentralityMode(url)

  }

  return (
    
    <div>
      <h1 className="text-2xl font-bold mb-4">Laporan & Analisis</h1>
      <div className="bg-base-200 shadow-xl p-6 rounded-md">
        <h2 className="font-bold mb-2">Performa Jaringan</h2>
        
        <SegmentedToggle
          options={centralityOptions}
          selected={centralityMode}
          onChange={setCentrality}
        />
        {graphData
        ? <GraphComponent data={graphData} weights={weights} />
        : <div>Loading…</div>}
      </div>
    </div>
  );
};

export default Laporan;