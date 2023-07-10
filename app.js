const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['menu', 'Menú',]).addAnswer([ '🍽️ Conoce nuestro delicioso Menu','Da click en el siguiente Link:*https://wa.me/c/5216241689488*'], {media:'https://i.ibb.co/Lxhnv1T/Whats-App-Image-2023-06-19-at-14-05-33.jpg'},{capture:true})




const flowDocs = addKeyword(['doc', 'documentacion', 'documentación']).addAnswer(
    [
        '📄 Aquí encontras las documentación recuerda que puedes mejorarla',
        'https://bot-whatsapp.netlify.app/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowTuto = addKeyword(['1', 'tuto'])
.addAnswer('🙌 Por favor mandanos tu ubicación por whatsapp o escribenos tu direccion',{capture:true})
.addAnswer(['🙌 Si tu Direccion es correcta Escribe 1️⃣', ' 🙌sino escribe 2️⃣'],{capture:true}, async (ctx,{flowDynamic,fallBack})=> {
   if(ctx.body !=='1') {
    flowDynamic ('introduce nuevamente tu Dirección',{capture:true})
   return fallBack('si tu dirección es correcta escribe 1')
   }
 })
    .addAnswer('🙌 despues de que hayas terminado escribe *Menu*',
    null,
    null,
    [flowSecundario])

 
const flowGracias = addKeyword(['2', 'epa']).addAnswer([ '🍽️ Conoce nuestro delicioso Menu (espera la Confirmacion en la Birreria)','Da click en el siguiente Link:*https://wa.me/c/5216241689488*','Si quieres ir al menu principal, escribe *hola* 👋🏻'], {media:'https://i.ibb.co/Lxhnv1T/Whats-App-Image-2023-06-19-at-14-05-33.jpg'})

const flowDiscord = addKeyword(['3','ubicación']).addAnswer(
    ['🤪 nuestra ubicación', 'https://goo.gl/maps/7wV7rY9rhv1A7sJv8 📍', '\n Para ver cual nuestra carta escribe *Menu*'],
    null,
    null,
    [flowSecundario]
)

const flowPrincipal = addKeyword(['hola','buenas' ,'ole', 'alo'])
    .addAnswer(['🙌 Hola bienvenido a este *Chatbot* soy un agente de la birreria URIBE sucursal San lucas, la mejor Birria de Toda la Baja \n','Nuestro horario de atención es de *7:00 am - 4:00 pm*','JUEVES A LUNES'],{
        media:'https://i.ibb.co/wyM4bY6/Whats-App-Image-2023-06-19-at-13-11-10.jpg'
        })
    .addAnswer(
        [   '🤳🏻 Selecciona el numero de tu Opción \n',
            '*1.-* Servicio a Domicilio 🛵😃 \n',
            '*2.-* Pasa a recoger tu pedido  🏃🏃🏻‍♀️\n',
            '*3.-* ¿Tienes mucha hambre? Conoce nuestra ubicacion 😁🍽️ \n',
            ' 👉🏻 Si no escribiste la opción correcta escribe nuevamente *hola* 👋🏻'
            
        ],
        null,
        null,
        [flowDocs, flowGracias, flowTuto, flowDiscord]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
