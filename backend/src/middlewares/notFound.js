const notFound =() => (req, res, next) =>{
    const err = new Error ("Page/Resource Does Not EXist");
    err.staus = 404;
    next(err);
};

export default notFound;