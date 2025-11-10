function Button({ name = 'Button', onClick, style}) {
    return (
        <button onClick={onClick} style={{width: '160px'}} >
            {name}
        </button>
    );
}

export default Button;