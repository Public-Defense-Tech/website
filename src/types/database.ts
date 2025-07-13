export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
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
            referencedRelation: "case_details_view"
            referencedColumns: ["case_id"]
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
            referencedRelation: "cases"
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
            referencedRelation: "case_details_view"
            referencedColumns: ["case_id"]
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
            referencedRelation: "cases"
            referencedColumns: ["id"]
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
            referencedRelation: "case_details_view"
            referencedColumns: ["case_id"]
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
            referencedRelation: "cases"
            referencedColumns: ["id"]
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
            referencedRelation: "case_details_view"
            referencedColumns: ["case_id"]
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
            referencedRelation: "cases"
            referencedColumns: ["id"]
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
            referencedRelation: "disposition"
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
            referencedRelation: "case_details_view"
            referencedColumns: ["case_id"]
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
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
        ]
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
            referencedRelation: "case_details_view"
            referencedColumns: ["case_id"]
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
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
        ]
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
            referencedRelation: "case_details_view"
            referencedColumns: ["case_id"]
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
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      case_details_view: {
        Row: {
          case_id: number | null
          case_type: string | null
          charge: string | null
          charge_date: string | null
          charge_desc: string | null
          charge_id: number | null
          charge_level: string | null
          charge_name: string | null
          county_of_jurisdiction: string | null
          date_filed: string | null
          defendant_race: string | null
          defendant_sex: string | null
          defense_attorney_name: string | null
          defense_attorney_type: string | null
          dismissed_charges_count: number | null
          disposition_date: string | null
          disposition_event: string | null
          has_evidence_of_representation: boolean | null
          is_primary_charge: boolean | null
          judicial_officer: string | null
          location: string | null
          offense_category_desc: string | null
          offense_type_desc: string | null
          original_charge: string | null
          outcome: string | null
          parsing_date: string | null
          prosecuting_attorney_name: string | null
          statute: string | null
          top_charge_level: string | null
          top_charge_name: string | null
          uccs_code: string | null
        }
        Relationships: []
      }
      cases: {
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
          id: number | null
          location: string | null
          odyssey_id: string | null
          parsing_date: string | null
          rn: number | null
          top_charge_level: string | null
          top_charge_name: string | null
          version: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      truncate_all_tables: {
        Args: { schema_name?: string }
        Returns: undefined
      }
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
