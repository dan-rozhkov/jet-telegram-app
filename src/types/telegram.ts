// Типы для Telegram WebApp API
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        enableClosingConfirmation: () => void;
        disableClosingConfirmation: () => void;
        showAlert: (message: string) => void;
        close: () => void;
        onEvent: (eventType: string, eventHandler: () => void) => void;
        offEvent: (eventType: string, eventHandler: () => void) => void;
        MainButton: {
          text: string;
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
        };
        themeParams: {
          bg_color?: string;
          text_color?: string;
          hint_color?: string;
          link_color?: string;
          button_color?: string;
          button_text_color?: string;
        };
      };
    };
  }
}

// Доступные события в @telegram-apps/bridge:
//
// События без payload (never):
// - accelerometer_started
// - accelerometer_stopped
// - back_button_pressed
// - device_orientation_started
// - device_orientation_stopped
// - emoji_status_set
// - fullscreen_changed (с payload)
// - gyroscope_started
// - gyroscope_stopped
// - home_screen_added
// - home_screen_failed
// - main_button_pressed
// - popup_closed (с payload)
// - prepared_message_sent
// - qr_text_received (с payload)
// - reload_iframe
// - scan_qr_popup_closed
// - secondary_button_pressed
// - settings_button_pressed
// - theme_changed (с payload)
// - viewport_changed (с payload)
// - visibility_changed (с payload)
//
// События с payload:
// - accelerometer_changed: { x: number, y: number, z: number }
// - accelerometer_failed: { error: string }
// - biometry_auth_requested: { status: string, token?: string }
// - biometry_info_received: { available: boolean, ... }
// - biometry_token_updated: { status: string }
// - clipboard_text_received: { req_id: string, data?: string }
// - content_safe_area_changed: SafeAreaInsets
// - custom_method_invoked: { req_id: string, result?: unknown, error?: string }
// - device_orientation_changed: { alpha: number, beta: number, gamma: number }
// - device_orientation_failed: { error: string }
// - emoji_status_access_requested: { status: string }
// - emoji_status_failed: { error: string }
// - file_download_requested: { status?: string }
// - fullscreen_failed: { error: string }
// - gyroscope_changed: { x: number, y: number, z: number }
// - gyroscope_failed: { error: string }
// - home_screen_checked: { status?: string }
// - invoice_closed: { slug: string, status: string }
// - location_checked: { available: boolean, ... }
// - location_requested: { available: boolean, latitude: number, longitude: number, ... }
// - phone_requested: { status: string }
// - prepared_message_failed: { error: string }
// - safe_area_changed: SafeAreaInsets
// - write_access_requested: { status: string }

export {};
