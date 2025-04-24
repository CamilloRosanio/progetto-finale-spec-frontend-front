// UTILITY
import { useEffect } from 'react';
import { useParams } from 'react-router';


// COMPONENT EXPORT
export default function ItemDetailsPage() {

    // GET URL PARAMS
    const { id: id } = useParams();

    // INIT USE-EFFECT
    useEffect(() => {
        // dato l'ID ottenuto come PARAM, filtrare l'array dei Prodotti fornito dal context e mostrare solo quello con ID in questione
    }, []);

    return <>

        Item detail page content

    </>
}