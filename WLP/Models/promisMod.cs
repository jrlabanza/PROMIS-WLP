using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace WLP.Models
{
		public class WLPMod
		{

            public List<IDictionary<string, string>> show_wlp_machines()
            {
                List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

                string query = "select id,file_datetime,TesterID,TesterPF,Handler_ID,device,pkg_type,Prod_Line,Lot_Name,Test_Stage,Temp,Sites,Max_sites,Index_Time,Test_Time,Curr_Status,Status_Owner,Comments,Who,lsg_repair_type,unpicked_devices,marking_surface,bump_leads,missing,lsg_sample,waferID,failure_mechanism,part_specification,pbft_min,pbft_max from testers where TesterPF = 'TNR' order by file_datetime asc";

                results = Connection.GetDataAssociateArray(query, "Show wlp machinelist", Connection.promis_connString);

                return results;
            }

            //public List<IDictionary<string, string>> show_process(string location)
            //{
            //    List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

            //    string query = "select distinct process from testers WHERE Location ='" + location + "'";

            //    results = Connection.GetDataAssociateArray(query, "Show FOL machinelist", Connection.promis_connString);

            //    return results;
            //}

            
            public List<IDictionary<string, string>> show_statusowner()
            {
                List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

                string query = "select distinct owner from promis_code_owner1 order by owner ASC";

                results = Connection.GetDataAssociateArray(query, "Show Status Owner", Connection.promis_connString);

                return results;
            }

            public List<IDictionary<string, string>> show_testerPF()
            {
                List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

                string query = "select distinct TesterPF from testers where TesterPF = 'TNR' order by TesterPF ASC";

                results = Connection.GetDataAssociateArray(query, "Show Tester PF", Connection.promis_connString);

                return results;
            }

            public List<IDictionary<string, string>> show_testerID_onload()
            {
                List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

                string query = "select TesterID FROM testers where TesterPF = 'TNR'";

                results = Connection.GetDataAssociateArray(query, "Show Tester ID", Connection.promis_connString);

                return results;
            }

            public List<IDictionary<string, string>> show_testerID(string pfid)
            {
                List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

                string query = "select TesterID FROM testers WHERE TesterPF ='" + pfid + "'";

                results = Connection.GetDataAssociateArray(query, "Show Tester ID", Connection.promis_connString);

                return results;
            }

            public IDictionary<string, string> show_Data(int id)
            {
                IDictionary<string, string> results = new Dictionary<string, string>();

                string query = "select * FROM testers WHERE id =" + id + "";

                results = Connection.GetDataArray(query, "Show FOL Data", Connection.promis_connString);

                return results;
            }

            public List<IDictionary<string, string>> get_status_owner()
            {
                List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

                string query = "select distinct owner from promis_code_owner1 order by owner ASC";

                results = Connection.GetDataAssociateArray(query, "Get Status Owner", Connection.promis_connString);

                return results;
            }

            public List<IDictionary<string, string>> get_status(string stsOwner)
            {
                List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

                string query = "select description from promis_code_owner1 where owner ='"+ stsOwner +"'order by owner asc";

                results = Connection.GetDataAssociateArray(query, "Get Status", Connection.promis_connString);

                return results;
            }

            public IDictionary<string, string> get_uph(string machinePF, string family)
            {
                IDictionary<string, string> results = new Dictionary<string, string>();

                string query = "select uph from p1_uph2 WHERE handler = '" + machinePF + "' and family = '" + family + "'";

                results = Connection.GetDataArray(query, "Get Family Type", Connection.promis_connString);

                return results;

            }

            public IDictionary<string, string> get_uph_check(string testerPF, string handlerPF, string family)
            {
                IDictionary<string, string> results = new Dictionary<string, string>();

                //string query = "select uph from p1_uph2 WHERE TESTER = '"+ testerPF +"' AND HANDLER = '" + handlerPF + "' AND FAMILY = '" + family + "'";

                string query = "select uph from p1_uph2 WHERE HANDLER = '" + handlerPF + "' AND FAMILY = '" + family + "'";

                results = Connection.GetDataArray(query, "Get Family Type", Connection.promis_connString);

                return results;

            }

            public List<IDictionary<string, string>> get_device()
            {
                List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

                string query = "select distinct family from p1_uph2 order by family asc";

                results = Connection.GetDataAssociateArray(query, "Get Family Type", Connection.promis_connString);

                return results;

            }

            public IDictionary<string, string> get_package_type(string id)
            {
                IDictionary<string, string> results = new Dictionary<string, string>();

                string query = "select Pkg_Type FROM p1_uph2 WHERE FAMILY ='" + id + "' LIMIT 1";

                results = Connection.GetDataArray(query, "Get Package Type", Connection.promis_connString);

                return results;
            }

            public IDictionary<string, string> get_handler_onLoad(string handlerID)
            {
                IDictionary<string, string> results = new Dictionary<string, string>();

                string query = "select equipt_model,Equipt_PF from equipt_list where Equipt_ID = '"+ handlerID +"' limit 1";

                results = Connection.GetDataArray(query, "Get Platform Type", Connection.promis_connString);

                return results;

            }

            public List<IDictionary<string, string>> get_prod_line()
            {
                List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

                string query = "select ProdLine from uph_prodline order by ProdLine asc";

                results = Connection.GetDataAssociateArray(query, "Get Production Line", Connection.promis_connString);

                return results;

            }

            public List<IDictionary<string, string>> show_filtered_machine_WLP(string statOwner, string machine, string machineID)
            {
                List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

                string GetstatOwner = "";
                string Getmachine = "";
                string GetmachineID = "";

                if (statOwner != "")
                {
                    GetstatOwner = "AND Status_Owner = '" + statOwner + "'";
                }

                if (machine != "")
                {
                    Getmachine = "AND TesterPF = '" + machine + "'";
                }

                if (machineID != "")
                {
                    GetmachineID = "AND TesterID = '" + machineID + "'";
                }

                string query = @"select id,file_datetime,TesterID,TesterPF,Handler_ID,device,pkg_type,Prod_Line,Lot_Name,Test_Stage,Temp,Sites,Max_sites,Index_Time,Test_Time,Curr_Status,Status_Owner,Comments,Who 
                                from testers 
                                where TesterPF = 'TNR' " + GetstatOwner + " " + Getmachine + "  " + GetmachineID + " order by file_datetime asc";

                results = Connection.GetDataAssociateArray(query, "Show WLP machinelist", Connection.promis_connString);

                return results;
            }

            ///

            public List<IDictionary<string, string>> get_all_user()
            {
                List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

                string query = "select email_address from users ORDER BY first_name ASC";

                results = Connection.GetDataAssociateArray(query, "Get User", Connection.promis_connString);

                return results;
            }

            public IDictionary<string, string> check_user(string user, string pass)
            {
                IDictionary<string, string> results = new Dictionary<string, string>();

                string query = "select email_address,password from users WHERE email_address ='"+ user +"'AND password ='"+ pass +"'";

                results = Connection.GetDataArray(query, "Check User", Connection.promis_connString);

                return results;
            }

            public IDictionary<string, string> check_track_by_machine(string machineID)
            {
                IDictionary<string, string> results = new Dictionary<string, string>();

                //string query = "SELECT * FROM track_record WHERE lot_name = '"+ lotNo +"' AND machine = '"+ machineID +"'";
                string query = "SELECT * FROM track_record WHERE machine = '" + machineID + "' ORDER BY date_issued DESC LIMIT 1";

                results = Connection.GetDataArray(query, "Check track by machine", Connection.promis_connString);

                return results;
            }

            public IDictionary<string, string> check_track_by_lot(string lotNo)
            {
                IDictionary<string, string> results = new Dictionary<string, string>();

                //string query = "SELECT * FROM track_record WHERE lot_name = '"+ lotNo +"' AND machine = '"+ machineID +"'";
                string query = "SELECT * FROM track_record WHERE lot_name = '" + lotNo + "' ORDER BY date_issued DESC LIMIT 1";

                results = Connection.GetDataArray(query, "Check track by lot", Connection.promis_connString);

                return results;
            }

            public Boolean insert_Data(string machineID, string machinePF, string stsOwner, string stsDes, string prodName, string lotNo, string pkgType, string remarks, string group, string user, string date3, string pkgLine, string waferID, string failure_mechanism, string part_specification, string lsg_repair_type, int pbft_min, int pbft_max, string swi_mode, string swi, string carrier_tape_lot_no, string cover_tape_lot_no, string setup_flg)
            {

                string query = "UPDATE testers set Device='" + prodName + "', pkg_type='" + pkgType + "', Lot_Name='" + lotNo + "', Curr_Status='" + stsDes + "', Status_Desc='" + stsDes + "', Status_Owner='" + stsOwner + "', Comments='" + remarks + "', who='" + user + "', file_datetime = '" + date3 + "', Prod_Line = '" + pkgLine + "', waferID = '" + waferID + "', failure_mechanism = '" + failure_mechanism + "', part_specification = '" + part_specification + "', lsg_repair_type = '" + lsg_repair_type + "', pbft_min = " + pbft_min + ", pbft_max = " + pbft_max + ", swi_mode = '" + swi_mode + "', swi = '" + swi + "', carrier_tape_lot_no = '" + carrier_tape_lot_no + "', cover_tape_lot_no = '" + cover_tape_lot_no + "', setup_flg = "+ setup_flg +" WHERE TesterID='" + machineID + "'";

                Boolean results = Connection.ExecuteThisQuery(query, "Get User", Connection.promis_connString);

                return results;
            }

            //public Boolean insert_Data_History(string machineID, string stsDes, string date1, string date2, string user, string remarks, string prodName, string lotNo, string uph, string stsOwner, string group, string pkgType)
            //{

            //    string query = "INSERT INTO " + machineID + " (Status,Date_Time,DateTime,Personnel,Comments,Device,Lot_ID,UPH,STATUS_OWNER,GROUPS,pkg_type) VALUES ('" + stsDes + "','" + date1 + "','" + date2 + "','" + user + "','" + remarks + "','" + prodName + "','" + lotNo + "'," + uph + ",'" + stsOwner + "','" + group + "','" + pkgType + "')";

            //    Boolean results = Connection.ExecuteThisQuery(query, "Get User", Connection.promis_connString);

            //    return results;
            //}

            public List<IDictionary<string, string>> export_allmachines()
            {
                List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

                string query = "SELECT * FROM testers order by TesterPF DESC";

                results = Connection.GetDataAssociateArray(query, "Download all Machiness", Connection.promis_connString);

                return results;
            }

            public List<IDictionary<string, string>> export_to_excel()
            {

                List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();

                List<IDictionary<string, string>> machinelist = new List<IDictionary<string, string>>();

                string query = "SELECT * FROM testers where TesterPF = 'TNR' order by TesterPF DESC";

                machinelist = Connection.GetDataAssociateArray(query, "Download TNR Machines", Connection.promis_connString);

                string query2 = "";

                int machine_list_length = machinelist.Count;

                for (int i = 0; i < machine_list_length; i++)
                {
                    query2 += "SELECT * FROM " + machinelist[i]["TesterID"];

                    if (machine_list_length - 1 == i)
                    {
                        query2 += "";
                    }
                    else
                    {
                        query2 += " UNION ";
                    }
                }
                
                results = Connection.GetDataAssociateArray(query2, "Download all Machiness", Connection.promis_connString);

                return results;
            }

            public Boolean insert_Data_History(string machineID, string stsDes, string date1, string date2, string user, string remarks,
            string prodName, string lotNo, double uph, string stsOwner, string group, string pkgType, int pbft_min, int pbft_max, string pkgLine, int bin1, int total_ng_units_result,
            string unpicked_device, string waferID, string marking_surface, string failure_mechanism, string bump_leads, string part_specification, string missing, string lsg_repair_type,
            string lsg_sample, int vi5_sample, string swi_mode, string swi, string carrier_tape_lot_no, string cover_tape_lot_no, string setup_flg)
            {

                string query = "INSERT INTO " + machineID + " (Status,Date_Time,DateTime,Personnel,Comments,Device,Lot_ID,UPH," +
                    "STATUS_OWNER,GROUPS,pkg_type,pbft_min,pbft_max,PROD_LINE,bin1,total_ng_units_result,unpicked_device,waferID,marking_surface," +
                    "failure_mechanism,bump_leads,part_specification,missing,lsg_repair_type,lsg_sample,vi5_sample,swi_mode,swi,carrier_tape_lot_no,cover_tape_lot_no,setup_flg) VALUES" +
                    "('" + stsDes + "','" + date1 + "','" + date2 + "','" + user + "','" + remarks + "','" + prodName + "','" + lotNo + "'," + uph + ",'" + stsOwner + "','" + group + "','" + pkgType + "', '" + pbft_min + "', '" + pbft_max + "', '" + pkgLine + "', '" + bin1 + "', '" + total_ng_units_result + "', '" + unpicked_device + "', '" + waferID + "', '" + marking_surface + "', '" + failure_mechanism + "', '" + bump_leads + "', '" + part_specification + "', '" + missing + "', '" + lsg_repair_type + "', '" + lsg_sample + "', '" + vi5_sample + "', '" + swi_mode + "', '" + swi + "', '" + carrier_tape_lot_no + "', '" + cover_tape_lot_no + "', "+ setup_flg +")";

                Boolean results = Connection.ExecuteThisQuery(query, "Get User", Connection.promis_connString);

                return results;
            }

            public IDictionary<string, string> check_lot(string machineID, string lotNo)
            {
                IDictionary<string, string> results = new Dictionary<string, string>();

                string query = "SELECT * FROM track_record WHERE lot_name = '" + lotNo + "' AND machine = '" + machineID + "'";

                results = Connection.GetDataArray(query, "Check User", Connection.promis_connString);

                return results;
            }

            public Boolean track_lot(string machineID, string track_in, string track_out, string lotNo, string user)
            {

                string query = "INSERT INTO track_record (date_issued,machine,process,track_in,track_out,lot_name,submitter) VALUES (CURRENT_TIMESTAMP,'"+ machineID +"', 'TNR', "+ track_in +", "+ track_out +", '"+ lotNo +"', '"+ user +"')";

                Boolean results = Connection.ExecuteThisQuery(query, "Insert Track Record", Connection.promis_connString);

                return results;
            }

            public Boolean update_track_lot(string machineID, string track_in, string track_out, string lotNo, string user)
            {

                string query = "UPDATE track_record SET track_in = '"+ track_in +"', track_out = '"+ track_out +"' WHERE machine = '"+ machineID +"' AND lot_name = '"+ lotNo +"'";

                Boolean results = Connection.ExecuteThisQuery(query, "Insert Track Record", Connection.promis_connString);

                return results;
            }

            public Boolean pbft_reset(string machineID)
            {

                string query = "UPDATE testers SET pbft_min = 0, pbft_max = 0, pbft_reset_cause = 'RESET DUE TO LOT CHANGE' WHERE Tester_ID = '" + machineID + "'";

                Boolean results = Connection.ExecuteThisQuery(query, "Get Package Type", Connection.promis_connString);

                return results;
            }

            public IDictionary<string, string> carrier_tape_check(string carrier_tape_lot_no)
            {
                IDictionary<string, string> results = new Dictionary<string, string>();

                string query = "SELECT carrier_tape_name FROM carrier_tape_check WHERE carrier_tape_name = '" + carrier_tape_lot_no + "'";

                results = Connection.GetDataArray(query, "Get Package Type", Connection.promis_connString);

                if (results.Count > 0)
                {
                    results["carrier_tape_validation"] = "CARRIER TAPE IS VALID";
                    return results;
                }

                else
                {
                    results["carrier_tape_validation"] = "CARRIER TAPE IS INVALID";
                    return results;
                }
                
            }

		}
}