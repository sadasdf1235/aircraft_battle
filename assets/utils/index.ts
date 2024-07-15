import { resources, AudioClip, AudioSource } from "cc";
export function loadAudio(self:any,url:string,isOnce:boolean){
    resources.load(url,AudioClip,(err,res)=>{
        const audio = self.node.getComponent(AudioSource);
        if(isOnce){
            audio.playOneShot(res);
            return;
        }
        audio.clip = res;
    });
}