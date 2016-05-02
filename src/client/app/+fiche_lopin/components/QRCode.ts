import "jquery.qrcode"
import "jquery"
declare var pdfmake:any;


export class QRCode{
    getQrCode(qrcodeUrl:string, texte:string) {
        var qrDiv = $('#qrcode');
        qrDiv.qrcode(qrcodeUrl);
        //noinspection TypeScriptUnresolvedFunction
        var qr = qrDiv.children().first()[0].toDataURL();

        var docDefinition = {
            // a string or { width: number, height: number }
            pageSize: 'A6',

            // by default we use portrait, you can change it to landscape if you wish
            pageOrientation: 'landscape',

            // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
            pageMargins: [20, 20, 20, 20],
            content: [
                {
                    columns: [
                        {
                            stack: [
                                {
                                    image: qr,
                                    width: 150,
                                    height: 150,
                                    margin: [0, 20]
                                },
                                {
                                    text: qrcodeUrl,
                                    margin: [10, 10],
                                    fontSize: 10,
                                    italics: true
                                },
                            ]
                        },

                        {
                            stack: [
                                {
                                    text : texte+'\nScanne moi ! ',
                                    margin: [0, 100],
                                }
                            ],
                            fontSize: 15
                        }
                    ]
                },

            ]
        };

        //noinspection TypeScriptUnresolvedVariable
        pdfMake.createPdf(docDefinition).open();
        qrDiv.empty();

    }
}