
export const getPagination = (page, size) => {
    const limit = size ? +size : 3; //Documentos por pagina seran 3
    const offset = page ? page * limit : 0; //Para Saltos de pagina
    return { limit, offset};
}