using System;
using System.Configuration;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Net.Sockets;
using System.Security.Cryptography;
using System.Text;

namespace BeyondVacation.BAL.Common
{



    public static class CommonMethod
    {
        public static DateTime Get_IND_Date()
        {
            return DateTime.UtcNow.AddHours(5).AddMinutes(30);
        }

        public static string DecryptStringAES(string cipherText)
        {
            var keybytes = Encoding.UTF8.GetBytes("8080808080808080");
            var iv = Encoding.UTF8.GetBytes("8080808080808080");
            byte[] encrypted;
            // var encrypted = Convert.FromBase64String(cipherText);
            //   var decriptedFromJavascript = DecryptStringFromBytes(encrypted, keybytes, iv);


            if (cipherText.Contains(" "))
            {
                encrypted = Convert.FromBase64String(cipherText.Replace(" ", "+"));
            }
            else
            {
                encrypted = Convert.FromBase64String(cipherText);
            }



            var decriptedFromJavascript = DecryptStringFromBytes(encrypted, keybytes, iv);


            //string decriptedFromJavascript = Convert.FromBase64String(encrypted.Replace("", "+"));

            return string.Format(decriptedFromJavascript);
        }
        private static string DecryptStringFromBytes(byte[] cipherText, byte[] key, byte[] iv)
        {


            // Check arguments.  
            if (cipherText == null || cipherText.Length <= 0)
            {
                throw new ArgumentNullException("cipherText");
            }
            if (key == null || key.Length <= 0)
            {
                throw new ArgumentNullException("key");
            }
            if (iv == null || iv.Length <= 0)
            {
                throw new ArgumentNullException("key");
            }

            // Declare the string used to hold  
            // the decrypted text.  
            string plaintext = null;

            // Create an RijndaelManaged object  
            // with the specified key and IV.  
            using (var rijAlg = new RijndaelManaged())
            {
                //Settings  
                rijAlg.Mode = CipherMode.CBC;
                rijAlg.Padding = PaddingMode.PKCS7;
                rijAlg.FeedbackSize = 128;

                rijAlg.Key = key;
                rijAlg.IV = iv;

                // Create a decrytor to perform the stream transform.  
                var decryptor = rijAlg.CreateDecryptor(rijAlg.Key, rijAlg.IV);

                try
                {
                    // Create the streams used for decryption.  
                    using (var msDecrypt = new MemoryStream(cipherText))
                    {
                        using (var csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                        {

                            using (var srDecrypt = new StreamReader(csDecrypt))
                            {
                                // Read the decrypted bytes from the decrypting stream  
                                // and place them in a string.  
                                plaintext = srDecrypt.ReadToEnd();

                            }

                        }
                    }
                }
                catch
                {
                    plaintext = "keyError";
                }
            }

            return plaintext;
        }

        public static string Get_Unique_No()
        {
            return DateTime.Now.ToString("MMyyyyddHHssffmm");
        }

        public static string getIpAddress()
        {
            string Machine_IP = "";
            var host = Dns.GetHostEntry(Dns.GetHostName());
            foreach (var ip in host.AddressList)
            {
                if (ip.AddressFamily == AddressFamily.InterNetwork)
                {
                    Machine_IP = ip.ToString();
                }
            }
            return Machine_IP;
        }

        public static void sendErrorFile(Exception ex)
        {
            DateTime dt = DateTime.UtcNow;
            string datestring;

            datestring = dt.ToString("yyyy-MM-dd");
            var filename = AppDomain.CurrentDomain.BaseDirectory + "ERROR_FILES\\" + datestring + ".txt";

            if (!System.IO.File.Exists(filename))
            {
                var myFile = System.IO.File.Create(filename);
                myFile.Close();
                TextWriter tw = new StreamWriter(filename);
                tw.WriteLine(ex.Message.ToString());
                tw.Close();
            }
            else
            {
                using (var tw = new StreamWriter(filename, true))
                {
                    tw.WriteLine(ex.Message.ToString());
                    tw.Close();
                }

            }

            SendMail("nivedita@softlabsgroup.com", "BBI Error", "Please find attached file for BBI Error", filename, "", "");
        }

        public static void SendMail(string recipient, string subject, string body, string AttachmentFiles = null, string cc = "", string bcc = "", bool IsHTML_Body = false)
        {
            //SmtpClient client = new SmtpClient("smtp-mail.outlook.com");



            SmtpClient client = new SmtpClient(ConfigurationManager.AppSettings["SMTP_SERVER"].ToString());

            client.Port = Convert.ToInt32(ConfigurationManager.AppSettings["SMTP_PORT"].ToString());
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;
            System.Net.NetworkCredential credentials = new System.Net.NetworkCredential(ConfigurationManager.AppSettings["NetworkCredential_UserId"].ToString(), ConfigurationManager.AppSettings["NetworkCredential_Password"].ToString());
            client.EnableSsl = true;
            client.Credentials = credentials;

            try
            {
                var mail = new MailMessage();
                string from = "";

                from = ConfigurationManager.AppSettings["NetworkCredential_UserId"].ToString();

                if (!string.IsNullOrEmpty(from.Trim()))
                {
                    mail.From = new MailAddress(from);
                }

                if (!string.IsNullOrEmpty(recipient.Trim()))
                {

                    foreach (var address in recipient.Split(new[] { ";" }, StringSplitOptions.RemoveEmptyEntries))
                    {
                        mail.To.Add(address);
                    }
                    //mail.To.Add(recipient);
                }

                if (!string.IsNullOrEmpty(cc.Trim()))
                {
                    mail.CC.Add(cc);
                }
                if (!string.IsNullOrEmpty(bcc.Trim()))
                {
                    mail.Bcc.Add(bcc);
                }


                mail.Subject = subject;
                mail.IsBodyHtml = IsHTML_Body;
                mail.Body = body;
                mail.Priority = MailPriority.High;


                if (!string.IsNullOrEmpty(AttachmentFiles))
                {
                    foreach (string a in AttachmentFiles.Split(new char[] { ',' }))
                    {
                        if (!string.IsNullOrEmpty(a))
                        {
                            Attachment att = new Attachment(a);
                            mail.Attachments.Add(att);
                        }
                    }
                }

                client.Send(mail);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw ex;
            }
        }

        public enum FormatPrefix
        {
            TS,
            DACPL
        }

        public enum Country : int
        {
            India = 76
        }

        public enum GSToption : int
        {
            Registered = 28,
            UnRegistered = 27,
        }

        public enum ErrorCodes : int
        {

            SessionExpired = 401
        }

        public enum LookupMstT : int
        {

            ClietType = 22,
            FirmType = 2,
            Prefix = 7,
            GSToption = 6,
        }
        public enum LookupDetT : int
        {
            Client = 130,
            ForeignClient=131,
            RFI1=138,
            RFI2 = 139,
            RFI3 = 140
        }

        public enum ClientType : int
        {
            IndianClient = 130,
            ForeignClient = 131,
            Creditor = 132,
            ReportingOnly = 133
        }

        public static string Get_IP_Address()
        {
            string ipaddress = string.Empty;

            var host = Dns.GetHostEntry(Dns.GetHostName());
            foreach (var ip in host.AddressList)
            {
                if (ip.AddressFamily == AddressFamily.InterNetwork)
                {
                    ipaddress = ip.ToString();
                    //TestID = ip.ToString();
                }
            }

            return ipaddress;

        }

        public static bool CheckSession(object session)
        {
            return Isnull(session);
        }


        public static bool Isnull(object objvalue)
        {
            return objvalue == null || objvalue.ToString().Trim() == string.Empty;
        }


        public static bool CreateFile(string filePath_Name)
        {
            try
            {
                if (!File.Exists(filePath_Name))
                {
                    FileStream fs = new FileStream(filePath_Name, FileMode.CreateNew);
                    fs.Close();
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public static bool WriteFile(string msg, string filePath_Name)
        {
            try
            {
                File.AppendAllText(filePath_Name, msg);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public static void LogException(string filePath_Name, string msg)
        {


            if (CreateFile(filePath_Name))
                WriteFile(msg, filePath_Name);
        }
        public static string GetDate()
        {
            return String.Format("{0:dd-MM-yyyy}", DateTime.UtcNow.AddHours(5).AddMinutes(30));
        }

        public static bool IsNullOrEmpty(this object source)
        {
            return source == null || source.ToString().Trim() == string.Empty;
        }

        public enum PlaceOfInspection
        {
            Manufacturer = 12,
            Site = 13,
            ConsigneeEnd = 14,
            ClientPremises = 15,
            Warehouse = 16
        }

        public enum ScopeOfInspection
        {
            Visual = 17,
            Dimension = 18,
            DocumentReview = 19,
            TypeTest = 20,
            WitnessTest = 21
        }

        public enum InspectionCategory
        {
            Stage = 22,
            Final = 23
        }

        public enum InspectionDocuments
        {
            POScope = 24,
            QAP = 25,
            RefStandard = 26
        }

        public enum FirmType
        {
            Proprietor = 4,
            Private = 5,
            Public = 6,
            Individual = 7,
            LLP = 8,
            Enterprises = 9,
            Government = 10,
            Trust = 11
        }
        
        public enum FileDocuments
        {
            RFI = 135,
            CallLetter = 41,
            CallDetails = 42,
            SupportingDocument = 43,
            InspectionReport = 44,
            QualityAssurancePlan = 45,
            InspectionTestPlan = 46,
            Drawings = 47,
            PurchaseOrder = 48,
            CoveringLetter = 49,
            Invoice = 50
        }

        public enum ReportType
        {
            StageReport = 146,
            InspectionReleaseNote = 147,
            FinalReport = 148,
            FinalStageReport = 1146
        }

        public enum RFIType
        {
            RFI1 = 138,
            RFI2 = 139,
            RFI3 = 140
        }

        public static string Encrypt(string str)
        {
            string EncrptKey = "2013;[pnuLIT)WebCodeExpert";
            byte[] byKey = { };
            byte[] IV = { 18, 52, 86, 120, 144, 171, 205, 239 };
            byKey = System.Text.Encoding.UTF8.GetBytes(EncrptKey.Substring(0, 8));
            DESCryptoServiceProvider des = new DESCryptoServiceProvider();
            byte[] inputByteArray = Encoding.UTF8.GetBytes(str);
            MemoryStream ms = new MemoryStream();
            CryptoStream cs = new CryptoStream(ms, des.CreateEncryptor(byKey, IV), CryptoStreamMode.Write);
            cs.Write(inputByteArray, 0, inputByteArray.Length);
            cs.FlushFinalBlock();
            return Convert.ToBase64String(ms.ToArray());
        }
        public static string GetLocalIPAddress()
        {
            var host = Dns.GetHostEntry(Dns.GetHostName());
            foreach (var ip in host.AddressList)
            {
                if (ip.AddressFamily == AddressFamily.InterNetwork)
                {
                    return ip.ToString();
                }
            }
            throw new Exception("No network adapters with an IPv4 address in the system!");
        }
    }
}
