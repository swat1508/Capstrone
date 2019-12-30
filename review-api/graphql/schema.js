const {GraphQLID,GraphQLString,GraphQLInt,GraphQLList,
    GraphQLNonNull, GraphQLObjectType, GraphQLSchema,GraphQLInputObjectType} = require("graphql");
const PizzaModel=require("../mongoose/model");

const ToppingsType = new GraphQLObjectType({
    name:"Toppings",
    fields:{
        id: { type: GraphQLID },
       name:{ type: GraphQLString},
    }
})
const PizzaType = new GraphQLObjectType({
    name: "Pizza",
    fields: {
        id: { type: GraphQLID },
        title: {  type: GraphQLString},
        description:{ type: GraphQLString},
        picture:  { type: GraphQLString},
        type:{ type: GraphQLString },
        createdBy:{ type: GraphQLString},
        price:{ type: GraphQLInt},
        toppings:{type: GraphQLList(ToppingsType)}
    }
});

const createUserPizzaInput = new GraphQLInputObjectType({
    name: 'sortAndFilterPizza',
    fields: () => ({
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        price:{ type: GraphQLString}
    })
});
const toppingInput = new GraphQLInputObjectType({
    name: 'topping',
    fields: () => ({
        name: { type: GraphQLString}
    })
})

function buildFilters({OR = [], title}) {
    title=title.trim().toLowerCase();
   return [{title: {$regex: `.*${title}.*`}},{description :{$regex: `.*${title}.*`}}]
}
function buildSorts({OR = [], title,description, price}){
    const sort= (title || description ||price) ? {} : null;
    if (title) {
        sort.title=title;
    }
    if (description) {
        sort.description=description;
    }
    if (price) {
        sort.price=price;
    }
    return sort;
}
module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: {
            pizzaList:{
                type: GraphQLList(PizzaType),
                args:{
                    filter:{type:  GraphQLList(createUserPizzaInput)},
                    sort: {type:  GraphQLList(createUserPizzaInput)}
                },
                resolve: (root, args, context, info) => {
                    let filterData={}, sortData={}
                    if(args.filter){
                        filterData=buildFilters(...args.filter).length?{$or: buildFilters(...args.filter)} :{}
                    }
                    if(args.sort){
                        sortData=buildSorts(...args.sort)||{}
                    }
                    return  PizzaModel.find(filterData,sortData).populate('name').exec();
                }
            },
            pizza: {
                type: PizzaType,
                args: {
                    id: { type: GraphQLNonNull(GraphQLID) }
                },
                resolve: (root, args, context, info) => {
                    return PizzaModel.findById(args.id).populate('name').exec();
                }
            }
        }
    }),
    mutation: new GraphQLObjectType({
        name: "Mutation",
        fields: {
            pizza: {
                type: PizzaType,
                args: {
                    title: { type: GraphQLNonNull(GraphQLString) },
                    description: { type: GraphQLNonNull(GraphQLString) },
                    picture: { type: GraphQLNonNull(GraphQLString) },
                    type: { type: GraphQLNonNull(GraphQLString) },
                    createdBy: { type: GraphQLNonNull(GraphQLString) },
                    price: { type: GraphQLNonNull(GraphQLInt) },
                    toppings:{type:GraphQLList(toppingInput)}
                },
                resolve: (root, args, context, info) => {
                    return PizzaModel.create(args);
                }
            }
        }
    })
});