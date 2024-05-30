let myChart = null;

const CONFIG_BG_COLOR_CHART = [
    'rgba(7, 209, 7, 0.8)',
    'rgba(220, 10, 10, 0.8)',
    'rgba(75, 72, 72, 0.8)',
    'rgba(220, 10, 10, 0.8)',
    'rgba(75, 72, 72, 0.8)',
    'rgba(13, 55, 224, 0.8)',
];
const CONFIG_LABELS = ['HP', 'Attack', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed'];

const CHART_OPTIONS =  {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
        legend: {
            display: false //remove legend 
        }
    },
    indexAxis: 'y', //transfort chart from vertival to horizontal
    scales: {
        x: {
            grid: {
                drawOnChartArea: false //remove grid lines
            }
        },
        y: {
            beginAtZero: true,
            grid: {
                drawOnChartArea: false //remove grid lines
            }
        }
    }
};


function renderChart(i) {
    const ctx = document.getElementById('pk_stats');
    if (myChart != null) {
        myChart.destroy();
    }
    
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: CONFIG_LABELS,
            datasets: [{
                data: [
                    pokemonRenderList[i]['stats'][0]['base_stat'],
                    pokemonRenderList[i]['stats'][1]['base_stat'],
                    pokemonRenderList[i]['stats'][2]['base_stat'],
                    pokemonRenderList[i]['stats'][3]['base_stat'],
                    pokemonRenderList[i]['stats'][4]['base_stat'],
                    pokemonRenderList[i]['stats'][5]['base_stat']],
                backgroundColor: CONFIG_BG_COLOR_CHART,
            }]
        },
        options: CHART_OPTIONS,
    });
}