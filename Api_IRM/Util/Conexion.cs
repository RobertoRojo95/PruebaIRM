using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Api_IRM.Util
{
    class Conexion
    {
        private SqlConnection objConn = new SqlConnection(ConfigurationManager.ConnectionStrings["irm"].ConnectionString);
        

        private static Conexion instancia;
        public static Conexion Instancia
        {
            get
            {
                if (instancia == null) instancia = new Conexion();
                return instancia;
            }
        }




        public static SqlConnection getConexion()
        {

            return new SqlConnection("server=localhost;Initial Catalog=testirm;uid=api_irm;pwd=prueba123");
        }

        public static void KillConexion(SqlConnection cxn)
        {
            try
            {
                cxn.Close();
                cxn.Dispose();
                cxn = null;
            }
            catch(Exception e)
            {
                throw e;
            }
        }
    }
}
