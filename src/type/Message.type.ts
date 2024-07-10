// import * as Types from '@line/bot-sdk/lib/types';
// import { type } from 'os';

// export type MessageType =
//     | TextMessage
//     | StickerMessage
//     | FileMessage
//     | ImageMessage
//     | VidoMessage
//     | AudioMessage
//     | LocationMessage
//     | ImageMapMessage
//     | TemplateMessage
//     | FlexMessage;

// export type MessageBase = { id: string};
// export type SenderMessage = { name:string, iconUrl:string}
// export type TextMessage = {
//     type: 'text';
//     text: string;
//     sender? : SenderMessage;
// } & MessageBase ;

// export type StickerMessage = {
//     type: 'sticker';
//     packageId: string;
//     stickerId: string;
//     stickerResourceType: 'STATIC' | 'ANIMATION' | 'SOUND' | 'ANIMATION_SOUND' | 'POPUP' | 'POPUP_SOUND' | 'NAME_TEXT';
//     sender? : SenderMessage;
// } & MessageBase;

// export type ImageMessage = {
//     type: 'image';
//     url: string;
//     sender? : SenderMessage;
// } & MessageBase;

// export type FileMessage = {
//     type: 'file';
//     url: string;
//     fileName: string;
//     sender? : SenderMessage;
// } & MessageBase;

// export type VidoMessage = {
//     type: 'video';
//     url: string;
//     sender? : SenderMessage;
// } & MessageBase;

// export type AudioMessage = {
//     type: 'audio';
//     url: string;
//     sender? : SenderMessage;
// } & MessageBase;

// export type LocationMessage = {
//     type: 'location';
//     title: string;
//     address: string;
//     latitude: number;
//     longitude: number;
//     sender? : SenderMessage;
// } & MessageBase;

// export type ImageMapMessage = {
//     type: 'imagemap';
//     url: string;
//     sender? : SenderMessage;
// } & MessageBase;

// export type TemplateMessage = {
//     type: 'template';
//     altText: string;
//     sender? : SenderMessage;
// } & MessageBase & Types.TemplateMessage;

// export type FlexMessage = {
//     type: 'flex';
//     altText: string;
//     sender? : SenderMessage;
// } & MessageBase & Types.FlexMessage;

// // Message Reply Line ;
// export type MessageRelyType =
//     | ReplyTextMessage
//     | ReplyImageMessage
//     | ReplyStickerMessage
//     | ReplyVideoMessage
//     | ReplyAudioMessage
//     | ReplyLocationMessage
//     | ReplyImageMapMessage
//     | ReplyTemplateMessage
//     | ReplyFileMessage
//     | ReplyFlexMessage
//     ;

// export type ReplyBase64Message = { base64File: string };

// export type ReplyTextMessage = Types.TextMessage;
// export type ReplyStickerMessage = Types.StickerMessage;
// export type ReplyImageMessage = Types.ImageMessage & ReplyBase64Message;
// export type ReplyVideoMessage = Types.VideoMessage & ReplyBase64Message & { previewBase64File: string };
// export type ReplyAudioMessage = Types.AudioMessage & ReplyBase64Message;
// export type ReplyLocationMessage = Types.LocationMessage;
// export type ReplyImageMapMessage = Types.ImageMapMessage & ReplyBase64Message;
// export type ReplyTemplateMessage = Types.TemplateMessage;
// export type ReplyFlexMessage = Types.FlexMessage;
// export type ReplyFileMessage = {
//     type: 'file';
//     fileName: string;
// } & ReplyBase64Message;

// export type ResponseBotMessage = {
//     messages: MessageRelyType[];
// };

// export type HandleWebhook = {
//     events: Types.WebhookEvent[];
//     destination: string;
// };
