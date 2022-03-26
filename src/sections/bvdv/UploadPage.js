import {styled} from "@mui/material/styles";
import Switch from "react-switch";
import {useEffect, useState} from "react";
import Select from 'react-select';
import {Button, Input} from "@mui/material";
import axios from "../../utils/axios";
import {useRouter} from 'next/router'

const moment = require('moment-timezone');

const RootStyle = styled('div')(() => ({
    height: '100%',
}));

const InlineStyle = styled('div')(() => ({
    display: 'inline-block',
    width: '10%',
    padding: 10
}));

const InlineLabelStyle = styled('div')(() => ({
    display: 'inline-block',
    width: '30%',
    padding: 10,
    marginLeft: 50
}));

const InlineValueStyle = styled('div')(() => ({
    display: 'inline-block',
    width: '15%',
    padding: 10,
}));

const ContentStyle = styled('div')(({theme}) => ({
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: theme.palette.background.default,
}));

const SubmitStyle = styled('div')(() => ({
    marginTop: 10,
    marginBottom: 100
    // marginLeft: 50
}));

const LineStyle = styled('div')(() => ({
    marginTop: 10,
    // marginLeft: 50
}));

const HeadStyle = styled('div')(() => ({
    fontWeight: 'bold',
    marginTop: 50
}));

export default function
    UploadPage({
                   uploadMode = true,
                   defaultRs = 0.5,
                   defaultR = 2,
                   defaultRm = 0.0263073,
                   defaultRmpi = 0.01,
                   defaultBpw = 0.5,
                   defaultBtw = 0.03,
                   defaultBpb = 0.1,
                   defaultBtb = 0,
                   defaultBpbn = 0.03,
                   defaultMode = 'UPLOAD',
                   defaultUrl = '',
                   defaultStorage = '',
                   defaultTotalRun = 1,
               }) {
    const [checked, setChecked] = useState(defaultMode === 'DEMO');
    const [url, setUrl] = useState('');
    const [urlDisabled, setUrlDisabled] = useState(false);
    const [selectDisabled, setSelectDisabled] = useState(false);
    const [storage, setStorage] = useState(false);

    const [rs, setRs] = useState(defaultRs);
    const [r, setR] = useState(defaultR);
    const [rm, setRm] = useState(defaultRm);
    const [rmpi, setRmpi] = useState(defaultRmpi);
    const [bpw, setBpw] = useState(defaultBpw);
    const [btw, setBtw] = useState(defaultBtw);
    const [bpb, setBpb] = useState(defaultBpb);
    const [btb, setBtb] = useState(defaultBtb);
    const [bpbn, setBpbn] = useState(defaultBpbn);
    const [btnDisabled, setBtnDisabled] = useState(false);

    const router = useRouter();

    useEffect(() => {
        setChecked(defaultMode === 'DEMO')
    }, [defaultMode])

    useEffect(() => {
        setUrl(defaultUrl)
    }, [defaultUrl])

    const options = [
        {value: 'gdrive', label: 'Google Drive'},
    ]

    const handleChange = (checked) => {
        setChecked(checked);
        if (checked) {
            setUrl('');
            setUrlDisabled(true);
            setSelectDisabled(true);
        } else {
            setUrlDisabled(false);
            setSelectDisabled(false);
        }
    }

    const redirect = async () => {
        const response = await axios.post('/bvdv', {
            mode: checked ? "DEMO" : "UPLOAD",
            url: checked ? null : url,
            storage: checked ? null : storage.value,
            rs: rs, r: r, rm: rm, rmpi: rmpi, bpw: bpw, btw: btw, bpb: bpb, btb: btb, bpbn: bpbn,
            createdAt: moment().tz("Asia/Ho_Chi_Minh").format()
        });
        const sessionId = response.data.sessionId;
        if (sessionId) router.push(`/progress/${sessionId}`);
    }

    return (
        <div>
            <HeadStyle>
                File upload
            </HeadStyle>
            <LineStyle>
                <InlineLabelStyle>Demo Mode:</InlineLabelStyle>
                <InlineStyle><Switch onChange={handleChange} checked={checked} checkedIcon={false}
                                     disabled={!uploadMode}
                                     uncheckedIcon={false}/></InlineStyle>
            </LineStyle>
            <LineStyle>
                <InlineLabelStyle>Data file/folder URL:</InlineLabelStyle>
                <InlineStyle style={{width: '20%'}}><Select options={options}
                                                            value={storage}
                                                            onChange={option => setStorage(option)}
                                                            isDisabled={!uploadMode || selectDisabled}/></InlineStyle>
                <InlineStyle style={{width: '35%'}}><Input fullWidth={true}
                                                           disabled={!uploadMode || urlDisabled}
                                                           value={url}
                                                           onChange={e => setUrl(e.currentTarget.value)}/></InlineStyle>
            </LineStyle>
            <HeadStyle>
                Configuration
            </HeadStyle>

            <LineStyle>
                <InlineLabelStyle>Sex-ratio:</InlineLabelStyle>
                <InlineStyle><Input type={'number'} defaultValue={rs}
                                    disabled={!uploadMode}
                                    onChange={e => setRs(Number(e.currentTarget.value))}/></InlineStyle>
                <InlineLabelStyle>Neighborhood circle radius (km):</InlineLabelStyle>
                <InlineStyle><Input type={'number'} defaultValue={r}
                                    disabled={!uploadMode}
                                    onChange={e => setR(Number(e.currentTarget.value))}/></InlineStyle>
            </LineStyle>
            <LineStyle>
                <InlineLabelStyle>Rate of mortality of PI animals</InlineLabelStyle>
                <InlineStyle><Input type={'number'} defaultValue={rm}
                                    disabled={!uploadMode}
                                    onChange={e => setRm(Number(e.currentTarget.value))}/></InlineStyle>
                <InlineLabelStyle>Rate of mortality of PI calves at birth:</InlineLabelStyle>
                <InlineStyle><Input type={'number'} defaultValue={rmpi}
                                    disabled={!uploadMode}
                                    onChange={e => setRmpi(Number(e.currentTarget.value))}/></InlineStyle>
            </LineStyle>
            <LineStyle>
                <InlineLabelStyle>Within-group transmission rate for P animals:</InlineLabelStyle>
                <InlineStyle><Input type={'number'} defaultValue={bpw}
                                    disabled={!uploadMode}
                                    onChange={e => setBpw(Number(e.currentTarget.value))}/></InlineStyle>
                <InlineLabelStyle>Within-group transmission rate for T animals:</InlineLabelStyle>
                <InlineStyle><Input type={'number'} defaultValue={btw}
                                    disabled={!uploadMode}
                                    onChange={e => setBtw(Number(e.currentTarget.value))}/></InlineStyle>
            </LineStyle>
            <LineStyle>
                <InlineLabelStyle>Between-group transmission rate for P animals:</InlineLabelStyle>
                <InlineStyle><Input type={'number'} defaultValue={bpb}
                                    disabled={!uploadMode}
                                    onChange={e => setBpb(Number(e.currentTarget.value))}/></InlineStyle>
                <InlineLabelStyle>Between-group transmission rate for T animals:</InlineLabelStyle>
                <InlineStyle><Input type={'number'} defaultValue={btb}
                                    disabled={!uploadMode}
                                    onChange={e => setBtb(Number(e.currentTarget.value))}/></InlineStyle>
            </LineStyle>
            <LineStyle>
                <InlineLabelStyle>Between-neighbor transmission rate for P animals:</InlineLabelStyle>
                <InlineStyle><Input type={'number'} defaultValue={bpbn}
                                    disabled={!uploadMode}
                                    onChange={e => setBpbn(Number(e.currentTarget.value))}/></InlineStyle>
            </LineStyle>


            {uploadMode ?
                <SubmitStyle style={{marginTop: 50, textAlign: 'center'}}>
                    <Button disabled={btnDisabled} type={"submit"} onClick={redirect} style={{border: '1px solid'}}>Submit</Button>
                </SubmitStyle> : ''
            }

        </div>
    );
}