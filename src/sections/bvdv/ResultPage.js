import {styled} from "@mui/material/styles";
import UploadPage from "./UploadPage";
import {Line, Scatter, Bar, Chart} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend, BarElement,
} from 'chart.js'
import axios from "../../utils/axios";
import Router from "next/router";
import {useEffect, useRef, useState} from "react";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement
)


const ResultStyle = styled('div')(() => ({
    marginTop: 20,
    marginLeft: 50,
    marginBottom: 100
}));

const LineStyle = styled('div')(() => ({
    marginTop: 10,
    // marginLeft: 50
}));

const HeadStyle = styled('div')(() => ({
    fontWeight: 'bold',
    marginTop: 50
}));

const SessionStyle = styled('div')(() => ({
    maxWidth: 400,
    margin: 'auto',
    textAlign: 'center',
    background: '#f7f7f7',
    border: '1px solid #80C480',
    borderRadius: 3,
    color: '#80C480',
    fontSize: 30,
    fontWeight: 700,
    letterSpacing: 4,
    padding: '15px 40px',
}));

const TIME_INTERVAL = ['1/1 - 14/1', '15/1 - 28/1',
    '29/1 - 11/2', '12/2 - 25/2',
    '26/2 - 11/3', '12/3 - 25/3',
    '26/3 - 8/4', '9/4 - 22/4',
    '23/4 - 6/5', '7/5 - 20/5',
    '21/5 - 3/6', '4/6 - 17/6',
    '18/6 - 1/7', '2/7 - 15/7',
    '16/7 - 29/7', '30/7 - 12/8',
    '13/8 - 26/8', '27/8 - 9/9',
    '10/9 - 23/9', '24/9 - 7/10',
    '8/10 - 21/10', '22/10 - 4/11',
    '5/11 - 18/11', '19/11 - 2/12',
    '3/12 - 16/12', '17/12 - 31/12']

export default function ResultPage({id}) {
    const [ptResult, setPtResult] = useState({});
    const [totalAnimalsData, setTotalAnimalsData] = useState([]);
    const [totalAnimalsLabel, setTotalAnimalsLabel] = useState([]);
    const [totalHerdsData, setTotalHerdsData] = useState([]);
    const [totalHerdsLabel, setTotalHerdsLabel] = useState([]);
    const [immuneData, setImmuneData] = useState([]);
    const [immuneLabel, setImmuneLabel] = useState([]);
    const chartRef = useRef();

    useEffect(async () => {
        const response = await axios.get(`/bvdv/${id}`, {});
        setPtResult(response.data);
    }, [])

    useEffect(async () => {
        const response = await axios.get(`/result/totalAnimals/${id}`, {});
        setTotalAnimalsLabel([...Array(response.data?.results?.length).keys()].map(v => TIME_INTERVAL[v % 26]));
        setTotalAnimalsData(response.data?.results);
    }, [])

    useEffect(async () => {
        const response = await axios.get(`/result/totalHerds/${id}`, {});
        setTotalHerdsLabel([...Array(response.data?.results?.length).keys()].map(v => TIME_INTERVAL[v % 26]));
        setTotalHerdsData(response.data?.results);
    }, [])

    useEffect(async () => {
        const response = await axios.get(`/result/immune/${id}`, {});
        // setImmuneLabel([...Array(response.data[0]?.results?.length).keys()]);
        // setImmuneData(response.data[0]?.results);
        // const result = response.data.map(d => d.results.map((r, i) => ({x: i, y: r}))).flat();
        let results = []
        for (let i = 0; i < response.data[0].results.length; i++) {
            results.push(response.data.map(d => d.results[i]).reduce((a, b) => a + b, 0) / response.data.length)
        }
        setImmuneData(results);
        setImmuneLabel([...Array(response.data[0]?.results?.length).keys()].map(v => TIME_INTERVAL[v % 26]))
    }, [])

    const totalAnimals = {
        labels: totalAnimalsLabel,
        datasets: [
            {
                label: "Total infected over time",
                data: totalAnimalsData,
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            }
        ],
        options: {
            scales: {
                x: {
                    ticks: {
                        callback: function (label) {
                            return `\$${this.getLabelForValue(label)}`
                        }
                    }
                }
            }
        }
    };

    const totalHerds = {
        labels: totalHerdsLabel,
        datasets: [
            {
                label: "Total herds infected over time",
                data: totalHerdsData,
                fill: true,
                backgroundColor: "rgba(100,100,192,0.2)",
                borderColor: "rgba(100,100,192,1)"
            }
        ]
    };

    const immuneProps = {
        labels: immuneLabel,
        datasets: [
            {
                label: "Average immune proportion over time",
                data: immuneData,
                fill: true,
                backgroundColor: "rgba(192,0,0,0.2)",
                borderColor: "rgba(192,0,0,1)"
            }
        ]
    };

    // const immuneProps = {
    //     // labels: totalHerdsLabel,
    //     datasets: [
    //         {
    //             label: 'A dataset',
    //             data: immuneData,
    //             // [{x: 1, y: 2}, {x: 3, y: 4}],
    //
    //             // Array.from({length: 100}, () => ({
    //             // x: [1, 2, 3, 4],
    //             // y: [5, 6, 7, 8],
    //             // })),
    //             backgroundColor: 'rgba(255, 99, 132, 1)',
    //         },
    //     ],
    // };

    return (
        <div>
            <HeadStyle>
                Session ID
            </HeadStyle>
            <SessionStyle>{id}</SessionStyle>
            <UploadPage uploadMode={false}
                        defaultMode={ptResult?.mode}
                        defaultUrl={ptResult?.url}
                        defaultStorage={ptResult?.storage}
                        defaultTotalRun={ptResult?.totalRun}
                        defaultRs={ptResult?.rs}
                        defaultR={ptResult?.r}
                        defaultRm={ptResult?.rm}
                        defaultRmpi={ptResult?.rmpi}
                        defaultBpw={ptResult?.bpw}
                        defaultBtw={ptResult?.btw}
                        defaultBpb={ptResult?.bpb}
                        defaultBtb={ptResult?.btb}
                        defaultBpbn={ptResult?.bpbn}/>
            <HeadStyle>
                Results
            </HeadStyle>

            <ResultStyle>
                <div className="App">
                    <Line data={totalAnimals} type={'line'}/>
                </div>
            </ResultStyle>

            <ResultStyle>
                <div className="App">
                    <Line data={totalHerds} type={'line'}/>
                </div>
            </ResultStyle>

            <ResultStyle>
                <div className="App">
                    <Chart data={immuneProps} type={'bar'}/>
                </div>
            </ResultStyle>
        </div>
    );
}