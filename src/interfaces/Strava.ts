
export type Activity = {
    id: number;
    name: string;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    total_elevation_gain: number;
    type: string;
    sport_type: string;
    start_date: string;
    start_date_local: string;
    timezone: string;
    utc_offset: number;
    location_city: string | null;
    location_state: string | null;
    location_country: string;
    athlete_count: number;
    kudos_count: number;
    comment_count: number;
    photo_count: number;
    trainer: boolean;
    commute: boolean;
    manual: boolean;
    private: boolean;
    visibility: string;
    flagged: boolean;
    average_speed: number;
    max_speed: number;
    pr_count: number;
    achievement_count: number;
    athlete: {
      id: number;
      resource_state: number;
    };
    gear_id: string | null;
    external_id: string;
    has_heartrate: boolean;
    workout_type: number | null;
    start_latlng: [number, number];
    end_latlng: [number, number];
    map: {
      id: string;
      summary_polyline: string;
      resource_state: number;
    };
    total_photo_count: number;
    has_kudoed: boolean;
    elev_high: number;
    elev_low: number;
    display_hide_heartrate_option: boolean;
    heartrate_opt_out: boolean;
    from_accepted_tag: boolean;
}