import api from "../../api";

export const fetchfavoriteSport = async () => {
    try {
        const response = await api.get('/user/favoriteSport/getFavoriteSportsList');
        return response.data;
    } catch (error) {
        console.error("Failed to Fetch Favorites Sport", error);
        throw error;
    }
}

export const AddfavoriteSport = async({sportsId}) =>{
    try {
        const response = await api.post('/user/favoriteSport/addFavoriteSports',{sportsId})
        return response.data;
    } catch (error) {
        console.error("Failed to add Favorite Sport",error);
        throw error;
    }
}

export const RemovefavoriteSport = async({favoriteSportsId}) =>{
    try {
        const response = await api.post('user/favoriteSport/removeFavoritesSports',{favoriteSportsId})
         return response.data;
    } catch (error) {
        console.error("Failed to remove Favorite Sport",error);
        throw error;
    }
}