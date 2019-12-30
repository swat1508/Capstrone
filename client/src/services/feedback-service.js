import axios, { baseURL } from "../config/axios";
function createNewFeedback(feedbackData){
    return  axios.post(`${baseURL}/feedback/create`,feedbackData);
}
function getAllFeedback(){
    return  axios.get(`${baseURL}/feedback/getall`);
}
function getFeedback(feedbackId){
    return  axios.get(`${baseURL}/feedback/get/${feedbackId}`);
}
function deleteFeedback(feedbackId){
    return  axios.delete(`${baseURL}/feedback/delete/${feedbackId}`);
}
function updateFeedback(feedbackId,feedbackData){
    return  axios.put(`${baseURL}/feedback/update/${feedbackId}`,feedbackData);
}
export {createNewFeedback,getAllFeedback,getFeedback,deleteFeedback,updateFeedback};

