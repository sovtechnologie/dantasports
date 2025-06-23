import api from "../../api";

export const fetchfavoriteSport = async ({ sportsId }) => {
    try {
        const response = await api.get('/user/favoriteSport/getFavoriteSportsList', { sportsId });
        return response.data;
    } catch (error) {
        console.error("Failed to Fetch Favorites Sport", error);
        throw error;
    }
}

export const AddfavoriteSport = async({sportsId}) =>{
    try {
        const response = await api.post('/user/favoriteSport/addFavoriteSports',{sportsId})

    } catch (error) {
        console.error("Failed to add Favorite Sport",error);
        throw error;
    }
}

export const RemovefavoriteSport = async({sportsId}) =>{
    try {
        const response = await api.post('user/favoriteSport/removeFavoritesSports',{sportsId})

    } catch (error) {
        console.error("Failed to remove Favorite Sport",error);
        throw error;
    }
}