// COMPONENT EXPORT
export default function productsReducer(state, action) {
    switch (action.type) {
        case 'DELETE':
            return state - action.payload.myPayload;
        case 'RESET':
            return 0;
        default:
            return state;
    }
}