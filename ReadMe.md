this is read me file

db.collection.aggregate([
    { $match: { name: 'dan' }},
    { $unwind: '$friends' },
    { $sort: { 'friends.height': -1 }},
    { $group: { _id: '$name', friends: { $push: '$friends'}}])
    
db.school.aggregate([
{ $unwind :'$students'},
{ $match : {'students.score': { $gt : 80} }},
{ $project : { _id:0, rollNo : '$students.rollNo', name : '$students.name', score : '$students.score' } }
])

{
    "address":"sachin kumar jain",
    "name":"domino",
    "image":"/assets/user.jpg",
    "placeId":"xyzcwtdsjsfhdsfaofraphabgvhf",
    "position":{lat:12.5647,lng:78.3245},
    "feedbacks":[],
    "types": [
        "meal_delivery",
        "meal_takeaway",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ]
}
{
	restaurantId:5df271fa6b6ec982f0456b91,
	"feedback":{
        "rating":{
            "bathroomQuality":4,
            "staff":3,
            "cleanliness":2,
            "delivery":5
        },
        "images":[{"name":"first image","path":"local"},{"name":"second image","path":"globle"}],
        "review":"hello we are going to use this",
        "likes":1,
		"dislikes":0,
		"useful":1,
		"cool":5,
        "commentBy":"sachin jain"
	}
}
 */