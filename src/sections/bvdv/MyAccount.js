import {styled} from "@mui/material/styles";
import Switch from "react-switch";
import {useEffect, useState} from "react";
import Select from 'react-select';
import {Button, Input} from "@mui/material";
import axios from "../../utils/axios";
import {useRouter} from 'next/router'
import useAuth from "../../hooks/useAuth";

const moment = require('moment-timezone');

const RootStyle = styled('div')(() => ({
    height: '100%',
}));

const InlineStyle = styled('div')(() => ({
    display: 'inline-block',
    width: '30%',
    padding: 10
}));

const InlineLabelStyle = styled('div')(() => ({
    display: 'inline-block',
    width: '10%',
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

export default function MyAccount() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push(`/`);
    };

    useEffect(async () => {
        const response = await axios.get('/account/my-account');
        setUsername(response?.data?.username);
        setEmail(response?.data?.email);
        setFirstName(response?.data?.firstName);
        setLastName(response?.data?.lastName);
    }, [])

    return (
        <div>
            <LineStyle>
                <InlineLabelStyle>First name:</InlineLabelStyle>
                <InlineStyle><Input value={firstName} fullWidth={true}/></InlineStyle>
                <InlineLabelStyle>Last name:</InlineLabelStyle>
                <InlineStyle><Input value={lastName} fullWidth={true}/></InlineStyle>
            </LineStyle>

            <LineStyle>
                <InlineLabelStyle>Username:</InlineLabelStyle>
                <InlineStyle><Input value={username} fullWidth={true}/></InlineStyle>
                <InlineLabelStyle>Email:</InlineLabelStyle>
                <InlineStyle><Input value={email} fullWidth={true}/></InlineStyle>
            </LineStyle>

            <SubmitStyle style={{marginTop: 50, textAlign: 'center'}}>
                <Button type={"submit"} onClick={handleLogout} style={{border: '1px solid', color: 'red'}}>Sign Out</Button>
            </SubmitStyle>
        </div>
    );
}