import { Container } from "@mui/material"
import Header from "../components/Header/Header"
import ReportsTable from "../components/Table/ReportsTable"

function Reports() {
    return (<>
        <Header/>
        <Container maxWidth="md">
            <ReportsTable />
        </Container>
    </>)
}

export default Reports