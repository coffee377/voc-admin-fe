// import Forbidden from './403';
// import NotFound from './404';
// import InternalServerError from './500';
//
// export { Forbidden, NotFound, InternalServerError };
//
// const Exception = { Forbidden, NotFound, InternalServerError };
//
// export default Exception;

export { default as Forbidden } from './403';
export { default as NotFound } from './404';
export { default as InternalServerError } from './500';
export { notice } from './notice';
