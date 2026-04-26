export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      attorney_detail_report: {
        Row: {
          adult_felony_cases_paid: number | null
          adult_misdemeanor_cases_paid: number | null
          adult_time_percent: number | null
          attorney_name: string | null
          bar_number: number | null
          capital_murder_cases_paid: number | null
          county: string | null
          court: string | null
          court_id: number | null
          felony_appeals_cases_paid: number | null
          fiscal_year: number | null
          id: string
          juvenile_appeals_cases_paid: number | null
          juvenile_cases_paid: number | null
          juvenile_time_percent: number | null
          misdemeanor_appeals_cases_paid: number | null
          total_cases: number | null
          total_paid: number | null
        }
        Insert: {
          adult_felony_cases_paid?: number | null
          adult_misdemeanor_cases_paid?: number | null
          adult_time_percent?: number | null
          attorney_name?: string | null
          bar_number?: number | null
          capital_murder_cases_paid?: number | null
          county?: string | null
          court?: string | null
          court_id?: number | null
          felony_appeals_cases_paid?: number | null
          fiscal_year?: number | null
          id: string
          juvenile_appeals_cases_paid?: number | null
          juvenile_cases_paid?: number | null
          juvenile_time_percent?: number | null
          misdemeanor_appeals_cases_paid?: number | null
          total_cases?: number | null
          total_paid?: number | null
        }
        Update: {
          adult_felony_cases_paid?: number | null
          adult_misdemeanor_cases_paid?: number | null
          adult_time_percent?: number | null
          attorney_name?: string | null
          bar_number?: number | null
          capital_murder_cases_paid?: number | null
          county?: string | null
          court?: string | null
          court_id?: number | null
          felony_appeals_cases_paid?: number | null
          fiscal_year?: number | null
          id?: string
          juvenile_appeals_cases_paid?: number | null
          juvenile_cases_paid?: number | null
          juvenile_time_percent?: number | null
          misdemeanor_appeals_cases_paid?: number | null
          total_cases?: number | null
          total_paid?: number | null
        }
        Relationships: []
      }
      attorney_detail_report_raw: {
        Row: {
          "Adult Felony Cases Paid": string | null
          "Adult Misdemeanor Cases Paid": string | null
          "Adult Time Percent": string | null
          "Attorney Name": string | null
          "Bar #": number | null
          "Capital Murder Cases Paid": string | null
          County: string | null
          Court: string | null
          "Court ID": number | null
          "Felony Appeals Cases Paid": string | null
          "FY Reported": number | null
          "Juvenile Appeals Cases Paid": string | null
          "Juvenile Cases Paid": string | null
          "Juvenile Time Percent": string | null
          "Misdemeanor Appeals Cases Paid": string | null
          "Total Cases": string | null
          "Total Paid": string | null
        }
        Insert: {
          "Adult Felony Cases Paid"?: string | null
          "Adult Misdemeanor Cases Paid"?: string | null
          "Adult Time Percent"?: string | null
          "Attorney Name"?: string | null
          "Bar #"?: number | null
          "Capital Murder Cases Paid"?: string | null
          County?: string | null
          Court?: string | null
          "Court ID"?: number | null
          "Felony Appeals Cases Paid"?: string | null
          "FY Reported"?: number | null
          "Juvenile Appeals Cases Paid"?: string | null
          "Juvenile Cases Paid"?: string | null
          "Juvenile Time Percent"?: string | null
          "Misdemeanor Appeals Cases Paid"?: string | null
          "Total Cases"?: string | null
          "Total Paid"?: string | null
        }
        Update: {
          "Adult Felony Cases Paid"?: string | null
          "Adult Misdemeanor Cases Paid"?: string | null
          "Adult Time Percent"?: string | null
          "Attorney Name"?: string | null
          "Bar #"?: number | null
          "Capital Murder Cases Paid"?: string | null
          County?: string | null
          Court?: string | null
          "Court ID"?: number | null
          "Felony Appeals Cases Paid"?: string | null
          "FY Reported"?: number | null
          "Juvenile Appeals Cases Paid"?: string | null
          "Juvenile Cases Paid"?: string | null
          "Juvenile Time Percent"?: string | null
          "Misdemeanor Appeals Cases Paid"?: string | null
          "Total Cases"?: string | null
          "Total Paid"?: string | null
        }
        Relationships: []
      }
      casemetadata: {
        Row: {
          case_name: string | null
          case_type: string | null
          county_of_jurisdiction: string | null
          court_case_number: string | null
          court_case_number_hashed: string | null
          date_filed: string | null
          dismissed_charges_count: number | null
          good_motions: string | null
          has_evidence_of_representation: boolean | null
          html_hash: string | null
          id: number
          location: string | null
          odyssey_id: string | null
          parsing_date: string | null
          top_charge_level: string | null
          top_charge_name: string | null
          version: number | null
        }
        Insert: {
          case_name?: string | null
          case_type?: string | null
          county_of_jurisdiction?: string | null
          court_case_number?: string | null
          court_case_number_hashed?: string | null
          date_filed?: string | null
          dismissed_charges_count?: number | null
          good_motions?: string | null
          has_evidence_of_representation?: boolean | null
          html_hash?: string | null
          id?: number
          location?: string | null
          odyssey_id?: string | null
          parsing_date?: string | null
          top_charge_level?: string | null
          top_charge_name?: string | null
          version?: number | null
        }
        Update: {
          case_name?: string | null
          case_type?: string | null
          county_of_jurisdiction?: string | null
          court_case_number?: string | null
          court_case_number_hashed?: string | null
          date_filed?: string | null
          dismissed_charges_count?: number | null
          good_motions?: string | null
          has_evidence_of_representation?: boolean | null
          html_hash?: string | null
          id?: number
          location?: string | null
          odyssey_id?: string | null
          parsing_date?: string | null
          top_charge_level?: string | null
          top_charge_name?: string | null
          version?: number | null
        }
        Relationships: []
      }
      charge: {
        Row: {
          case_id: number
          charge_date: string | null
          charge_desc: string | null
          charge_id: number | null
          charge_level: string | null
          charge_name: string | null
          id: number
          is_primary_charge: boolean | null
          offense_category_desc: string | null
          offense_type_desc: string | null
          original_charge: string | null
          statute: string | null
          uccs_code: string | null
        }
        Insert: {
          case_id: number
          charge_date?: string | null
          charge_desc?: string | null
          charge_id?: number | null
          charge_level?: string | null
          charge_name?: string | null
          id?: number
          is_primary_charge?: boolean | null
          offense_category_desc?: string | null
          offense_type_desc?: string | null
          original_charge?: string | null
          statute?: string | null
          uccs_code?: string | null
        }
        Update: {
          case_id?: number
          charge_date?: string | null
          charge_desc?: string | null
          charge_id?: number | null
          charge_level?: string | null
          charge_name?: string | null
          id?: number
          is_primary_charge?: boolean | null
          offense_category_desc?: string | null
          offense_type_desc?: string | null
          original_charge?: string | null
          statute?: string | null
          uccs_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "charge_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "all_taylor_data"
            referencedColumns: ["casemetadata_id"]
          },
          {
            foreignKeyName: "charge_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "casemetadata"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "charge_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "latest_case_all_things_taylor"
            referencedColumns: ["casemetadata_id"]
          },
        ]
      }
      counties: {
        Row: {
          created_at: string | null
          fips_code: string | null
          id: number
          name: string
          population: number | null
          region: string | null
        }
        Insert: {
          created_at?: string | null
          fips_code?: string | null
          id: number
          name: string
          population?: number | null
          region?: string | null
        }
        Update: {
          created_at?: string | null
          fips_code?: string | null
          id?: number
          name?: string
          population?: number | null
          region?: string | null
        }
        Relationships: []
      }
      counties_managed_systems: {
        Row: {
          area_sq_miles: number | null
          case_type_appeal: boolean | null
          case_type_capital: boolean | null
          case_type_felony: boolean | null
          case_type_felony_mh: boolean | null
          case_type_juvenile: boolean | null
          case_type_misdemeanor: boolean | null
          case_type_misdemeanor_mh: boolean | null
          case_type_other: boolean | null
          county: string | null
          county_seat: string | null
          created_at: string
          id: number
          name: string | null
          population: number | null
          system_type: string | null
        }
        Insert: {
          area_sq_miles?: number | null
          case_type_appeal?: boolean | null
          case_type_capital?: boolean | null
          case_type_felony?: boolean | null
          case_type_felony_mh?: boolean | null
          case_type_juvenile?: boolean | null
          case_type_misdemeanor?: boolean | null
          case_type_misdemeanor_mh?: boolean | null
          case_type_other?: boolean | null
          county?: string | null
          county_seat?: string | null
          created_at?: string
          id?: number
          name?: string | null
          population?: number | null
          system_type?: string | null
        }
        Update: {
          area_sq_miles?: number | null
          case_type_appeal?: boolean | null
          case_type_capital?: boolean | null
          case_type_felony?: boolean | null
          case_type_felony_mh?: boolean | null
          case_type_juvenile?: boolean | null
          case_type_misdemeanor?: boolean | null
          case_type_misdemeanor_mh?: boolean | null
          case_type_other?: boolean | null
          county?: string | null
          county_seat?: string | null
          created_at?: string
          id?: number
          name?: string | null
          population?: number | null
          system_type?: string | null
        }
        Relationships: []
      }
      court_activity: {
        Row: {
          county_id: number
          court_type: string
          document_id: string
          id: string
          measure_detail: string
          measure_group: string | null
          measure_type: string
          month: number
          offense_type: string
          position: string | null
          value: number | null
          year: number
        }
        Insert: {
          county_id: number
          court_type: string
          document_id: string
          id?: string
          measure_detail: string
          measure_group?: string | null
          measure_type: string
          month: number
          offense_type: string
          position?: string | null
          value?: number | null
          year: number
        }
        Update: {
          county_id?: number
          court_type?: string
          document_id?: string
          id?: string
          measure_detail?: string
          measure_group?: string | null
          measure_type?: string
          month?: number
          offense_type?: string
          position?: string | null
          value?: number | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "court_activity_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "counties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "court_activity_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
        ]
      }
      court_summary: {
        Row: {
          county_id: number
          court_type: string
          document_id: string
          id: string
          measure_detail: string
          measure_type: string
          month: number
          value: number | null
          year: number
        }
        Insert: {
          county_id: number
          court_type: string
          document_id: string
          id?: string
          measure_detail: string
          measure_type: string
          month: number
          value?: number | null
          year: number
        }
        Update: {
          county_id?: number
          court_type?: string
          document_id?: string
          id?: string
          measure_detail?: string
          measure_type?: string
          month?: number
          value?: number | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "court_summary_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "counties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "court_summary_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
        ]
      }
      defendant: {
        Row: {
          address: string | null
          case_id: number
          date_of_birth: string | null
          height: string | null
          id: number
          name: string | null
          race: string | null
          sex: string | null
          sid: string | null
          weight: string | null
        }
        Insert: {
          address?: string | null
          case_id: number
          date_of_birth?: string | null
          height?: string | null
          id?: number
          name?: string | null
          race?: string | null
          sex?: string | null
          sid?: string | null
          weight?: string | null
        }
        Update: {
          address?: string | null
          case_id?: number
          date_of_birth?: string | null
          height?: string | null
          id?: number
          name?: string | null
          race?: string | null
          sex?: string | null
          sid?: string | null
          weight?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "defendant_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: true
            referencedRelation: "all_taylor_data"
            referencedColumns: ["casemetadata_id"]
          },
          {
            foreignKeyName: "defendant_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: true
            referencedRelation: "casemetadata"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "defendant_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: true
            referencedRelation: "latest_case_all_things_taylor"
            referencedColumns: ["casemetadata_id"]
          },
        ]
      }
      defenseattorney: {
        Row: {
          appointed_retained: string | null
          attorney_hash: string | null
          case_id: number
          id: number
          name: string | null
          phone: string | null
        }
        Insert: {
          appointed_retained?: string | null
          attorney_hash?: string | null
          case_id: number
          id?: number
          name?: string | null
          phone?: string | null
        }
        Update: {
          appointed_retained?: string | null
          attorney_hash?: string | null
          case_id?: number
          id?: number
          name?: string | null
          phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "defenseattorney_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "all_taylor_data"
            referencedColumns: ["casemetadata_id"]
          },
          {
            foreignKeyName: "defenseattorney_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "casemetadata"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "defenseattorney_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "latest_case_all_things_taylor"
            referencedColumns: ["casemetadata_id"]
          },
        ]
      }
      disposition: {
        Row: {
          case_id: number
          date: string | null
          event: string | null
          id: number
          judicial_officer: string | null
        }
        Insert: {
          case_id: number
          date?: string | null
          event?: string | null
          id?: number
          judicial_officer?: string | null
        }
        Update: {
          case_id?: number
          date?: string | null
          event?: string | null
          id?: number
          judicial_officer?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "disposition_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "all_taylor_data"
            referencedColumns: ["casemetadata_id"]
          },
          {
            foreignKeyName: "disposition_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "casemetadata"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "disposition_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "latest_case_all_things_taylor"
            referencedColumns: ["casemetadata_id"]
          },
        ]
      }
      dispositiondetail: {
        Row: {
          charge: string | null
          disposition_id: number
          id: number
          outcome: string | null
        }
        Insert: {
          charge?: string | null
          disposition_id: number
          id?: number
          outcome?: string | null
        }
        Update: {
          charge?: string | null
          disposition_id?: number
          id?: number
          outcome?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dispositiondetail_disposition_id_fkey"
            columns: ["disposition_id"]
            isOneToOne: false
            referencedRelation: "all_taylor_data"
            referencedColumns: ["disposition_row_id"]
          },
          {
            foreignKeyName: "dispositiondetail_disposition_id_fkey"
            columns: ["disposition_id"]
            isOneToOne: false
            referencedRelation: "disposition"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dispositiondetail_disposition_id_fkey"
            columns: ["disposition_id"]
            isOneToOne: false
            referencedRelation: "latest_case_all_things_taylor"
            referencedColumns: ["disposition_row_id"]
          },
        ]
      }
      documents: {
        Row: {
          county_id: number
          court_type: string
          file_path: string
          id: string
          month: number
          parsed_at: string | null
          parser_version: string
          year: number
        }
        Insert: {
          county_id: number
          court_type: string
          file_path: string
          id?: string
          month: number
          parsed_at?: string | null
          parser_version: string
          year: number
        }
        Update: {
          county_id?: number
          court_type?: string
          file_path?: string
          id?: string
          month?: number
          parsed_at?: string | null
          parser_version?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "documents_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "counties"
            referencedColumns: ["id"]
          },
        ]
      }
      event: {
        Row: {
          case_id: number
          date: string | null
          details: string | null
          event: string | null
          id: number
        }
        Insert: {
          case_id: number
          date?: string | null
          details?: string | null
          event?: string | null
          id?: number
        }
        Update: {
          case_id?: number
          date?: string | null
          details?: string | null
          event?: string | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "event_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "all_taylor_data"
            referencedColumns: ["casemetadata_id"]
          },
          {
            foreignKeyName: "event_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "casemetadata"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "latest_case_all_things_taylor"
            referencedColumns: ["casemetadata_id"]
          },
        ]
      }
      indigent_defense_expenditure_data_dollars: {
        Row: {
          "2022_Population_Estimate": number | null
          Adult_Capital_Murder_Felony_Count_of_Filed_Cases: number | null
          Adult_Misdemeanor_Count_of_Filed_Cases: number | null
          "Adult_Non-Capital_Felony_Count_of_Filed_Cases": number | null
          Count_of_Cases_Paid_with_No_Court_Identified: number | null
          County: string | null
          County_Administrative_Costs: number | null
          created_at: string
          Direct_Client_Service_Expenditures: number | null
          Felony_Charges_Disposed: number | null
          Gross_Indigent_Defense_Costs: number | null
          id: number
          Juvenile_Charges_Disposed: number | null
          Juvenile_Count_of_Filed_Cases: number | null
          Misdemeanor_Charges_Disposed: number | null
          No_of_Courts_Reporting_Expenditures: number | null
          Received_from_Participating_Counties_in_Regional_Program:
            | number
            | null
          Reimbursements_from_Defendants: number | null
          Total_Count_of_Indigent_Defense_Cases: number | null
          Total_Funds_Disbursed: number | null
          Year: number | null
        }
        Insert: {
          "2022_Population_Estimate"?: number | null
          Adult_Capital_Murder_Felony_Count_of_Filed_Cases?: number | null
          Adult_Misdemeanor_Count_of_Filed_Cases?: number | null
          "Adult_Non-Capital_Felony_Count_of_Filed_Cases"?: number | null
          Count_of_Cases_Paid_with_No_Court_Identified?: number | null
          County?: string | null
          County_Administrative_Costs?: number | null
          created_at?: string
          Direct_Client_Service_Expenditures?: number | null
          Felony_Charges_Disposed?: number | null
          Gross_Indigent_Defense_Costs?: number | null
          id?: number
          Juvenile_Charges_Disposed?: number | null
          Juvenile_Count_of_Filed_Cases?: number | null
          Misdemeanor_Charges_Disposed?: number | null
          No_of_Courts_Reporting_Expenditures?: number | null
          Received_from_Participating_Counties_in_Regional_Program?:
            | number
            | null
          Reimbursements_from_Defendants?: number | null
          Total_Count_of_Indigent_Defense_Cases?: number | null
          Total_Funds_Disbursed?: number | null
          Year?: number | null
        }
        Update: {
          "2022_Population_Estimate"?: number | null
          Adult_Capital_Murder_Felony_Count_of_Filed_Cases?: number | null
          Adult_Misdemeanor_Count_of_Filed_Cases?: number | null
          "Adult_Non-Capital_Felony_Count_of_Filed_Cases"?: number | null
          Count_of_Cases_Paid_with_No_Court_Identified?: number | null
          County?: string | null
          County_Administrative_Costs?: number | null
          created_at?: string
          Direct_Client_Service_Expenditures?: number | null
          Felony_Charges_Disposed?: number | null
          Gross_Indigent_Defense_Costs?: number | null
          id?: number
          Juvenile_Charges_Disposed?: number | null
          Juvenile_Count_of_Filed_Cases?: number | null
          Misdemeanor_Charges_Disposed?: number | null
          No_of_Courts_Reporting_Expenditures?: number | null
          Received_from_Participating_Counties_in_Regional_Program?:
            | number
            | null
          Reimbursements_from_Defendants?: number | null
          Total_Count_of_Indigent_Defense_Cases?: number | null
          Total_Funds_Disbursed?: number | null
          Year?: number | null
        }
        Relationships: []
      }
      relatedcase: {
        Row: {
          case_id: number
          id: number
          related_case: string | null
        }
        Insert: {
          case_id: number
          id?: number
          related_case?: string | null
        }
        Update: {
          case_id?: number
          id?: number
          related_case?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "relatedcase_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "all_taylor_data"
            referencedColumns: ["casemetadata_id"]
          },
          {
            foreignKeyName: "relatedcase_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "casemetadata"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "relatedcase_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "latest_case_all_things_taylor"
            referencedColumns: ["casemetadata_id"]
          },
        ]
      }
      scrapemetadata: {
        Row: {
          county: string | null
          created_at: string
          date_time_end: string | null
          date_time_start: string | null
          ending_case_id_num: number | null
          ending_case_type: string | null
          ending_cause_num: string | null
          ending_year: number | null
          id: number
          starting_cause_num: string | null
        }
        Insert: {
          county?: string | null
          created_at?: string
          date_time_end?: string | null
          date_time_start?: string | null
          ending_case_id_num?: number | null
          ending_case_type?: string | null
          ending_cause_num?: string | null
          ending_year?: number | null
          id?: number
          starting_cause_num?: string | null
        }
        Update: {
          county?: string | null
          created_at?: string
          date_time_end?: string | null
          date_time_start?: string | null
          ending_case_id_num?: number | null
          ending_case_type?: string | null
          ending_cause_num?: string | null
          ending_year?: number | null
          id?: number
          starting_cause_num?: string | null
        }
        Relationships: []
      }
      stateinformation: {
        Row: {
          case_id: number
          id: number
          prosecuting_attorney: string | null
          prosecuting_attorney_phone: string | null
        }
        Insert: {
          case_id: number
          id?: number
          prosecuting_attorney?: string | null
          prosecuting_attorney_phone?: string | null
        }
        Update: {
          case_id?: number
          id?: number
          prosecuting_attorney?: string | null
          prosecuting_attorney_phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stateinformation_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: true
            referencedRelation: "all_taylor_data"
            referencedColumns: ["casemetadata_id"]
          },
          {
            foreignKeyName: "stateinformation_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: true
            referencedRelation: "casemetadata"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stateinformation_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: true
            referencedRelation: "latest_case_all_things_taylor"
            referencedColumns: ["casemetadata_id"]
          },
        ]
      }
    },
    Views: {
      attorney_yearly_totals: {
            Row: {
              attorney_name: string | null
              bar_number: string | null
              fiscal_year: number | null
              total_cases_reported: number | null
              total_paid_amount: number | null
            }
            Insert: {
              // Note: Views are usually read-only and don't accept inserts.
              // This can be left empty unless you have triggers handling inserts.
            }
            Update: {
              // Note: Views are usually read-only and don't accept updates.
            }
            Relationships: []
          }
        },    
      all_taylor_data: {
        Row: {
          appointed_retained: string | null
          attorney_hash: string | null
          case_key: string | null
          case_name: string | null
          case_type: string | null
          casemetadata_id: number | null
          charge_date: string | null
          charge_desc: string | null
          charge_id: number | null
          charge_level: string | null
          charge_name: string | null
          charge_row_id: number | null
          county_of_jurisdiction: string | null
          court_case_number: string | null
          court_case_number_hashed: string | null
          date_filed: string | null
          defendant_address: string | null
          defendant_date_of_birth: string | null
          defendant_height: string | null
          defendant_id: number | null
          defendant_name: string | null
          defendant_race: string | null
          defendant_sex: string | null
          defendant_sid: string | null
          defendant_weight: string | null
          defenseattorney_name: string | null
          defenseattorney_phone: string | null
          defenseattorney_row_id: number | null
          dismissed_charges_count: number | null
          disposition_date: string | null
          disposition_event: string | null
          disposition_row_id: number | null
          dispositiondetail_charge: string | null
          dispositiondetail_outcome: string | null
          dispositiondetail_row_id: number | null
          event_date: string | null
          event_details: string | null
          event_name: string | null
          event_row_id: number | null
          good_motions: string | null
          has_evidence_of_representation: boolean | null
          html_hash: string | null
          is_primary_charge: boolean | null
          judicial_officer: string | null
          location: string | null
          odyssey_id: string | null
          offense_category_desc: string | null
          offense_type_desc: string | null
          original_charge: string | null
          parsing_date: string | null
          prosecuting_attorney: string | null
          prosecuting_attorney_phone: string | null
          related_case: string | null
          relatedcase_row_id: number | null
          stateinformation_id: number | null
          statute: string | null
          top_charge_level: string | null
          top_charge_name: string | null
          uccs_code: string | null
          version: number | null
        }
        Relationships: []
      }
      annual_caseload: {
        Row: {
          annual_added: number | null
          annual_disposed: number | null
          county: string | null
          county_id: number | null
          court_type: string | null
          dec_pending: number | null
          jan_pending: number | null
          year: number | null
        }
        Relationships: [
          {
            foreignKeyName: "court_activity_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "counties"
            referencedColumns: ["id"]
          },
        ]
      }
      county_per_capita_spending: {
        Row: {
          County: string | null
          county_slug: string | null
          net_per_capita_spending: number | null
          total_net_expenditure: number | null
        }
        Insert: {
          County?: string | null
          county_slug?: never
          net_per_capita_spending?: never
          total_net_expenditure?: never
        }
        Update: {
          County?: string | null
          county_slug?: never
          net_per_capita_spending?: never
          total_net_expenditure?: never
        }
        Relationships: []
      }
      county_year_disposition_summary: {
        Row: {
          county_id: number | null
          total_disposed_felonies: number | null
          total_disposed_misdemeanors: number | null
          total_felony_convictions: number | null
          total_felony_dismissals: number | null
          total_misdemeanor_convictions: number | null
          total_misdemeanor_dismissals: number | null
          year: number | null
        }
        Relationships: [
          {
            foreignKeyName: "court_activity_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "counties"
            referencedColumns: ["id"]
          },
        ]
      }
      court_activity_named: {
        Row: {
          county: string | null
          county_id: number | null
          court_type: string | null
          id: string | null
          measure_detail: string | null
          measure_group: string | null
          measure_type: string | null
          month: number | null
          offense_type: string | null
          position: string | null
          value: number | null
          year: number | null
        }
        Relationships: [
          {
            foreignKeyName: "court_activity_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "counties"
            referencedColumns: ["id"]
          },
        ]
      }
      court_summary_named: {
        Row: {
          county: string | null
          county_id: number | null
          court_type: string | null
          id: string | null
          measure_detail: string | null
          measure_type: string | null
          month: number | null
          value: number | null
          year: number | null
        }
        Relationships: [
          {
            foreignKeyName: "court_summary_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "counties"
            referencedColumns: ["id"]
          },
        ]
      }
      disposition_breakdown: {
        Row: {
          acquittals: number | null
          convictions: number | null
          county: string | null
          county_id: number | null
          court_type: string | null
          deferred: number | null
          dismissals: number | null
          month: number | null
          mtr_granted: number | null
          total_disposed: number | null
          year: number | null
        }
        Relationships: [
          {
            foreignKeyName: "court_activity_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "counties"
            referencedColumns: ["id"]
          },
        ]
      }
      latest_case_all_things_taylor: {
        Row: {
          appointed_retained: string | null
          attorney_hash: string | null
          case_key: string | null
          case_name: string | null
          case_type: string | null
          casemetadata_id: number | null
          charge_date: string | null
          charge_desc: string | null
          charge_id: number | null
          charge_level: string | null
          charge_name: string | null
          charge_row_id: number | null
          county_of_jurisdiction: string | null
          court_case_number: string | null
          court_case_number_hashed: string | null
          date_filed: string | null
          defendant_address: string | null
          defendant_date_of_birth: string | null
          defendant_height: string | null
          defendant_id: number | null
          defendant_name: string | null
          defendant_race: string | null
          defendant_sex: string | null
          defendant_sid: string | null
          defendant_weight: string | null
          defenseattorney_name: string | null
          defenseattorney_phone: string | null
          defenseattorney_row_id: number | null
          dismissed_charges_count: number | null
          disposition_date: string | null
          disposition_event: string | null
          disposition_row_id: number | null
          dispositiondetail_charge: string | null
          dispositiondetail_outcome: string | null
          dispositiondetail_row_id: number | null
          event_date: string | null
          event_details: string | null
          event_name: string | null
          event_row_id: number | null
          good_motions: string | null
          has_evidence_of_representation: boolean | null
          html_hash: string | null
          is_primary_charge: boolean | null
          judicial_officer: string | null
          location: string | null
          odyssey_id: string | null
          offense_category_desc: string | null
          offense_type_desc: string | null
          original_charge: string | null
          parsing_date: string | null
          prosecuting_attorney: string | null
          prosecuting_attorney_phone: string | null
          related_case: string | null
          relatedcase_row_id: number | null
          stateinformation_id: number | null
          statute: string | null
          top_charge_level: string | null
          top_charge_name: string | null
          uccs_code: string | null
          version: number | null
        }
        Relationships: []
      }
      monthly_caseload: {
        Row: {
          cases_added: number | null
          cases_disposed: number | null
          county: string | null
          county_id: number | null
          court_type: string | null
          month: number | null
          pending_end: number | null
          pending_start: number | null
          placed_inactive: number | null
          year: number | null
        }
        Relationships: [
          {
            foreignKeyName: "court_activity_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "counties"
            referencedColumns: ["id"]
          },
        ]
      }
      v_hays_attorney_caseload: {
        Row: {
          attorney_hash: string | null
          attorney_name: string | null
          cases: number | null
          year: number | null
        }
        Relationships: []
      }
      v_hays_attorney_caseload_latest: {
        Row: {
          attorney_hash: string | null
          attorney_name: string | null
          cases: number | null
          year: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      display_attorney: {
        Args: { hash: string; name: string }
        Returns: string
      }
      get_county_court_stats: {
        Args: { target_county_id: number; target_year: number }
        Returns: {
          total_disposed_felonies: number
          total_disposed_misdemeanors: number
          total_felony_convictions: number
          total_felony_dismissals: number
          total_misdemeanor_convictions: number
          total_misdemeanor_dismissals: number
        }[]
      }
      truncate_all_tables: {
        Args: { schema_name?: string }
        Returns: undefined
      }
      try_parse_date: { Args: { d: string }; Returns: string }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
