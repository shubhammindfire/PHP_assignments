import axios from "axios";

// custom hook to delete a todo
function useUpdateTodo(url, id, column, newValue) {
    // const dispatch = useDispatch();
    // useEffect(() => {}, []);

    axios
        .post(url, {
            id: id,
            column: column,
            newValue: newValue,
        })
        .then((response) => {
            console.log(`DONE response: ${JSON.stringify(response)}`);
            // console.log(`DONE response: ${JSON.stringify(response.data)}`);
            // console.log("SUCCESS");
            // TODO not able to call dispatch hook as it breaks 'rules of hook'
            // dispatch addTodo;
        })
        .catch((error) => {
            console.error(`Axios Error: ${error}`);
        });
}
export default useUpdateTodo;
