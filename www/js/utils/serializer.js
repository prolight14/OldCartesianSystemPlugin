function serialize(Cls)
{
    return function()
    {
        // https://stackoverflow.com/questions/1606797/use-of-apply-with-new-operator-is-this-possible
        var newCls = new (Function.prototype.bind.apply(Cls, [null].concat(Array.prototype.slice.call(arguments))));

        for(var i in newCls)
        {
            this[i] = newCls[i];
        }

        return newCls;
    };
}