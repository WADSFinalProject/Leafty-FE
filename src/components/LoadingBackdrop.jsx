import LoadingStatic from "@components/LoadingStatic"
import { Backdrop } from "@mui/material"

function LoadingBackdrop(loading) {
    return <>
        <Backdrop
            sx={{ color: '#94C3B3', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
        ><LoadingStatic /></Backdrop>
    </>
}

export default LoadingBackdrop