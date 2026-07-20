import type { Emotion } from '../types/emotion.types';
export const emotionOrder: Emotion[] = ['happy','excited','surprised','wink','laughing','playful','cute','proud','satisfied','relaxed','curious','thinking','confused','sad','disappointed','angry','warning','worried','sleepy','love'];
export const emotionLabels: Record<Emotion, string> = {
  happy:'Vui vẻ', excited:'Háo hức', surprised:'Ngạc nhiên', wink:'Nháy mắt', laughing:'Cười lớn', playful:'Tinh nghịch', cute:'Dễ thương', proud:'Tự hào', satisfied:'Hài lòng', relaxed:'Thư giãn', curious:'Tò mò', thinking:'Suy tư', confused:'Bối rối', sad:'Buồn', disappointed:'Thất vọng', angry:'Tức giận', warning:'Cảnh báo', worried:'Lo lắng', sleepy:'Ngủ gật', love:'Yêu thương'
};
