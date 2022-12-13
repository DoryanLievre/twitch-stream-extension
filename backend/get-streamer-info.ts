// const url = `https://api.twitch.tv/helix/streams?user_id=${userId}`;
// const headers = {
//     'Authorization': `Bearer ${token}`,
//     'Client-Id': ``,
// };

const channelInfo = document.getElementById('info') as HTMLElement;

const checker = function (json: any) {
    if (json.data.length > 0) {
        channelInfo.innerText = "I'm awake come to my place precious little gem ~"
    } else {
        channelInfo.innerText = "I'm a dangerous noodle BUT I'm sleeping right now ~"
    }
}

function fetchTwitchApi(url: string, headers: any, checker: (json: any) => void) {
    fetch(url, {
        headers: headers
    }).then((response) => {
        return response.json();
    }).then((json) => checker(json));
}

// fetchTwitchApi(url, headers, checker);