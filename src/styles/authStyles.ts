const styles = {
  form: {   
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
    fieldset: {
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '20px',
        width: '300px',
        backgroundColor: '#fff',
    },
    legend: {
        fontSize: '1.5em',
        marginBottom: '10px',
    },
    input: {
        width: '100%',
        padding: '10px',
        margin: '5px 0',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '10px 15px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#007BFF',
        color: '#fff',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        fontSize: '0.9em',
        marginBottom: '10px',
    },
    success: {
        color: 'green',
        fontSize: '0.9em',
        marginBottom: '10px',
    },
    link: {
        color: '#007BFF',
        textDecoration: 'none',
        fontSize: '0.9em',
    },
    linkContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: '10px',
    },
};
export default styles;