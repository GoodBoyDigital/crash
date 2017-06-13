
export default class Group
{
    constructor(children)
    {
        this.children = children || [];
    }

    add(item)
    {
        var index = this.children.indexOf(item);
        if(index !== -1)return item;

        this.children.push(item);

        return item;
    }

    remove(item)
    {
        var index = this.children.indexOf(item);

        if(index === -1)return null;

        this.children.splice(index, 1);

        return item;
    }

    getIndex(item)
    {
        return this.children.indexOf(item);
    }

    getItem(index)
    {
        return this.children[index];
    }

    run(f, scope)
    {
        if(scope)
        {
            for (var i = 0; i <  this.children.length; i++) {

                f.call(scope, this.children[i]);
            }
        }
        else
        {

            for (var i = 0; i <  this.children.length; i++) {

                f( this.children[i] );
            }
        }

    }

    empty()
    {
        this.children.length = 0;
    }

}