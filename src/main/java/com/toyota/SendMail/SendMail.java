package com.toyota.SendMail;
import java.util.*;
import javax.mail.*;
import javax.mail.internet.*;

public class SendMail {

    private static String USER_NAME = "infosautoyota@gmail.com";  // GMail user name (just the part before "@gmail.com")
    private static String PASSWORD = "Toyota12*"; // GMail password
    private static void sendFromGMail(String from, String pass, String[] to, String subject, String body) {
        Properties props = System.getProperties();
        String host = "smtp.gmail.com";
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.user", from);
        props.put("mail.smtp.password", pass);
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.auth", "true");

        Session session = Session.getDefaultInstance(props);
        MimeMessage message = new MimeMessage(session);

        try {
            message.setFrom(new InternetAddress(from));
            InternetAddress[] toAddress = new InternetAddress[to.length];

            // To get the array of addresses
            for( int i = 0; i < to.length; i++ ) {
                toAddress[i] = new InternetAddress(to[i]);
            }

            for( int i = 0; i < toAddress.length; i++) {
                message.addRecipient(Message.RecipientType.TO, toAddress[i]);
            }

            message.setSubject(subject);
            message.setText(body);
            Transport transport = session.getTransport("smtp");
            transport.connect(host, from, pass);
            transport.sendMessage(message, message.getAllRecipients());
            transport.close();
        }
        catch (AddressException ae) {
            ae.printStackTrace();
        }
        catch (MessagingException me) {
            me.printStackTrace();
        }
    }
    public void WaitforConfirm(String toEmail,String name){
        String from = USER_NAME;
        String pass = PASSWORD;
        String[] to = { toEmail }; // list of recipient email addresses
        String subject = "Saü Toyota Bilgilendirme";
        String body = "Merhaba "+name+",\n\n"  +
                "Kullanıcı kaydınız oluşturulmuştur.\n" +
                "Hesabınız onaylandığında mail yoluyla bilgilendirileceksiniz.\n\n" +
                "İyi Günler.";

        sendFromGMail(from, pass, to, subject, body);
    }
    public void ConfirmedEmail(String toEmail,String name,String role){
        String from = USER_NAME;
        String pass = PASSWORD;
        String[] to = { toEmail }; // list of recipient email addresses
        String subject = "Saü Toyota Bilgilendirme";
        String body = "Merhaba "+name+",\n\n"  +
                "Hesabınız site yetkilisi tarafından onaylanmıştır.\n" +
                 role+" yetkisi ile sitemize giriş yapabilirsiniz\n\n" +
                "İyi Günler.";

        sendFromGMail(from, pass, to, subject, body);
    }

}


