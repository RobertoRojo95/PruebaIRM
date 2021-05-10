using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using Api_IRM.Util;
using Api_IRM.Model;
using System.Data;

namespace Api_IRM.DataAccess
{
    public class ContactoAccess
    {

        SqlConnection objConexion = null;

        public ContactoAccess()
        {
           objConexion = Conexion.getConexion();
        }


        public List<Contacto> getContactos()
        {
            
            SqlCommand cmd = new SqlCommand("SP_Contacto", objConexion);
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@action", 1);
            List<Contacto> datos = new List<Contacto>();
            try
            {
                if (objConexion.State == ConnectionState.Open) objConexion.Close();
                objConexion.Open();

                datos = ParseContacto(cmd.ExecuteReader());

                objConexion.Close();
            }
            catch (SqlException ex) { throw ex; }
            return datos;
        }

        public List<Contacto> agregarContacto(Contacto c)
        {
            SqlCommand cmd = new SqlCommand("SP_Contacto", objConexion);
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@action", 2);
            cmd.Parameters.AddWithValue("@nombre", c.NombreCompleto);
            cmd.Parameters.AddWithValue("@direccion", c.Direccion);
            cmd.Parameters.AddWithValue("@telefono", c.Telefono);
            cmd.Parameters.AddWithValue("@curp", c.CURP);
            cmd.Parameters.AddWithValue("@fechaRegistro", DateTime.Now);
            List<Contacto> datos = new List<Contacto>();
            try
            {
                if (objConexion.State == ConnectionState.Open) objConexion.Close();
                objConexion.Open();

                datos = ParseContacto(cmd.ExecuteReader());

                objConexion.Close();
            }
            catch (SqlException ex) { throw ex; }
            return datos;
        }

        public List<Contacto> editarContacto(int id,Contacto c)
        {
            SqlCommand cmd = new SqlCommand("SP_Contacto", objConexion);
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@action", 3);
            cmd.Parameters.AddWithValue("@id", id);
            cmd.Parameters.AddWithValue("@nombre", c.NombreCompleto);
            cmd.Parameters.AddWithValue("@direccion", c.Direccion);
            cmd.Parameters.AddWithValue("@telefono", c.Telefono);
            cmd.Parameters.AddWithValue("@curp", c.CURP);
            cmd.Parameters.AddWithValue("@fechaRegistro", DateTime.Now);

            List<Contacto> datos = new List<Contacto>();
            try
            {
                if (objConexion.State == ConnectionState.Open) objConexion.Close();
                objConexion.Open();

                datos = ParseContacto(cmd.ExecuteReader());

                objConexion.Close();
            }
            catch (SqlException ex) { throw ex; }
            return datos;
        }

        public List<Contacto> borrarContacto(int id)
        {
            SqlCommand cmd = new SqlCommand("SP_Contacto", objConexion);
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@action", 4);
            cmd.Parameters.AddWithValue("@id", id);
            List<Contacto> datos = new List<Contacto>();
            try
            {
                if (objConexion.State == ConnectionState.Open) objConexion.Close();
                objConexion.Open();

                datos = ParseContacto(cmd.ExecuteReader());

                objConexion.Close();
            }
            catch (SqlException ex) { throw ex; }
            return datos;
        }



        public List<Contacto> ParseContacto(object obj)
        {
            SqlDataReader lector = (obj as SqlDataReader);
            List<Contacto> lista = null;
            while (lector.Read())
            {
                if (lista == null) lista = new List<Contacto>();
                Contacto cont = new Contacto();

                cont.Id = int.Parse(lector["id"].ToString());
                cont.NombreCompleto = lector["nombre_completo"].ToString();
                cont.Direccion = lector["direccion"].ToString();
                cont.Telefono = lector["telefono"].ToString();
                cont.CURP = lector["curp"].ToString();
                cont.FechaRegistro = DateTime.Parse(lector["fecha_registro"].ToString());
                cont.Activo = Convert.ToBoolean(lector["activo"].ToString());

                lista.Add(cont);
            }
            return lista;
        }



    }
}
