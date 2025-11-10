function Button({ name = 'Button', onClick}) {
    return (
        <button onClick={onClick}>{name}</button>
    );
}

export default Button;