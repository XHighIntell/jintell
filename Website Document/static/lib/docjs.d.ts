type docObjContent = docObj | Array<docObj | string>;

type docObj =
    {
        /** A simple  */
        _: "default",

        /**  */
        name: string,

        syntax: string,
        syntax_language: string,
        icon: string,
        id: string,
        content: docObjContent
    } |
    { _: 'overloads', overloads: docObjContent } |
    {
        /** 11111 */
        _: 'property' | 'sproperty', name: string, icon: string, type: string, default: any, type_ref: string, content: docObjContent
    } |
    { _: 'parameter', name: string, type: string, type_ref: string, content: docObjContent } |
    { _: 'item-members', content: docObjContent } |
    {
        _: 'code-block',
        /**asdasd */
        name: string,
        language: string,
        code: string,
    } |
    {
        _: 'list',
        content: docObjContent,
    };

type docObj2<T> = { _: T }
//type docObj3 = docObj2 & { [K in keyof Document]: Document[K] };


function abc<T>(_: T, aaa: docObj3<T>);

type docObj3<T> = docObj2<T> &
    {
        [K in keyof DocMap[T]]: DocMap[T][K]
    }

type x = { [K in keyof Document]: Document[K] };



interface DocMap {
    "default": { name: string },
    "property": { name: string, type: string, value: any }
}



