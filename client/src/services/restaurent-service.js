import axios , { baseURL }from '../config/axios';
function createNewRestaurant(restaurantData){
    return  axios.post(`${baseURL}/restaurant/create`,restaurantData);
}
function getAllRestaurant(){
    return  axios.get(`${baseURL}/restaurant/getall`);
}
function getRestaurant(restaurantId){
    return  axios.get(`${baseURL}/restaurant/get/${restaurantId}`);
}
function deleteRestaurant(restaurantId){
    return  axios.delete(`${baseURL}/restaurant/delete/${restaurantId}`);
}
function updateRestaurant(restaurantId,restaurantData){
    return  axios.put(`${baseURL}/restaurant/update/${restaurantId}`,restaurantData);
}
export {createNewRestaurant,getAllRestaurant,getRestaurant,deleteRestaurant,updateRestaurant};

