export function generateRoomId(){
    let res = "";
    const chars = ["a","b","c","d"];
    for(let i = 0; i < chars.length * 0.5 ;i++){
        res += chars[Math.floor(Math.random() * chars.length)];
        res += String(Math.floor(Math.random() * chars.length));
    }
    return res;
}