import {useFirestore} from "../../contexts/FirebaseContext";
import {styled} from "@mui/material/styles";
import UploadPage from "./UploadPage";
import {useEffect, useState} from "react";
import {ClipLoader} from "react-spinners";

const ResultStyle = styled('div')(() => ({
    marginTop: 20,
    marginLeft: 50,
    marginBottom: 100
}));

const RedirectStyle = styled('div')(() => ({
    textAlign: "center",
    // marginTop: 20,
    // marginLeft: 50,
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

export default function ProgressPage({id}) {
    const resultUrl = window.location.origin + `/result/${id}`;
    const [showRedirect, setShowRedirect] = useState(false);
    const consoleResults = useFirestore("consoleResults", {
        fieldName: 'id',
        operator: '==',
        compareValue: id
    });

    useEffect(() => {
        if (consoleResults[0]?.isFinished) {
            setShowRedirect(true)
        }
    }, [consoleResults]);


    return (
        <div>
            <HeadStyle>
                Session ID
            </HeadStyle>
            <SessionStyle>{id}</SessionStyle>
            <UploadPage uploadMode={false}
                        defaultMode={consoleResults[0]?.mode}
                        defaultUrl={consoleResults[0]?.url}
                        defaultStorage={consoleResults[0]?.storage}
                        defaultTotalRun={consoleResults[0]?.totalRun}
                        defaultRs={consoleResults[0]?.rs}
                        defaultR={consoleResults[0]?.r}
                        defaultRm={consoleResults[0]?.rm}
                        defaultRmpi={consoleResults[0]?.rmpi}
                        defaultBpw={consoleResults[0]?.bpw}
                        defaultBtw={consoleResults[0]?.btw}
                        defaultBpb={consoleResults[0]?.bpb}
                        defaultBtb={consoleResults[0]?.btb}
                        defaultBpbn={consoleResults[0]?.bpbn}
            />
            <HeadStyle>
                Progress
            </HeadStyle>

            <ResultStyle>
                {consoleResults[0]?.results.map((r, i) => {
                    return (<div key={i}>{r}</div>);
                })}
            </ResultStyle>

            <RedirectStyle>
                <div style={{visibility: showRedirect ? "hidden" : "visible"}}><ClipLoader/></div>
                <div style={{visibility: showRedirect ? "visible" : "hidden"}}>
                    <span>Redirect to result page: </span>
                    <a target={"_blank"} href={resultUrl}>{resultUrl}</a>
                </div>
            </RedirectStyle>
        </div>
    );
}