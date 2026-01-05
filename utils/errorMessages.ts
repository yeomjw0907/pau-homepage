import { SupportedLanguage } from '../types';

export enum ErrorType {
  NETWORK_ERROR = 'NETWORK_ERROR',
  API_KEY_MISSING = 'API_KEY_MISSING',
  API_KEY_INVALID = 'API_KEY_INVALID',
  TIMEOUT = 'TIMEOUT',
  RATE_LIMIT = 'RATE_LIMIT',
  UNKNOWN = 'UNKNOWN'
}

export interface ErrorMessage {
  title: string;
  message: string;
  action?: string;
}

const errorMessages: Record<ErrorType, Record<SupportedLanguage, ErrorMessage>> = {
  [ErrorType.NETWORK_ERROR]: {
    'English': {
      title: 'Connection Error',
      message: 'Unable to connect to the server. Please check your internet connection and try again.',
      action: 'Check your internet connection'
    },
    'Spanish': {
      title: 'Error de Conexión',
      message: 'No se puede conectar al servidor. Por favor, verifique su conexión a Internet e intente nuevamente.',
      action: 'Verifique su conexión a Internet'
    },
    'Chinese (Simplified)': {
      title: '连接错误',
      message: '无法连接到服务器。请检查您的互联网连接并重试。',
      action: '检查您的互联网连接'
    },
    'Korean': {
      title: '연결 오류',
      message: '서버에 연결할 수 없습니다. 인터넷 연결을 확인하고 다시 시도해주세요.',
      action: '인터넷 연결 확인'
    },
    'Vietnamese': {
      title: 'Lỗi Kết Nối',
      message: 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối internet của bạn và thử lại.',
      action: 'Kiểm tra kết nối internet'
    },
    'Japanese': {
      title: '接続エラー',
      message: 'サーバーに接続できません。インターネット接続を確認して、もう一度お試しください。',
      action: 'インターネット接続を確認'
    },
    'French': {
      title: 'Erreur de Connexion',
      message: 'Impossible de se connecter au serveur. Veuillez vérifier votre connexion Internet et réessayer.',
      action: 'Vérifiez votre connexion Internet'
    },
    'Tagalog': {
      title: 'Error sa Koneksyon',
      message: 'Hindi makakonekta sa server. Pakisuri ang iyong koneksyon sa internet at subukan muli.',
      action: 'Suriin ang iyong koneksyon sa internet'
    }
  },
  [ErrorType.API_KEY_MISSING]: {
    'English': {
      title: 'API Key Not Configured',
      message: 'The translation service requires an API key. Please contact the administrator.',
      action: 'Contact administrator'
    },
    'Spanish': {
      title: 'Clave API No Configurada',
      message: 'El servicio de traducción requiere una clave API. Por favor, contacte al administrador.',
      action: 'Contactar administrador'
    },
    'Chinese (Simplified)': {
      title: 'API密钥未配置',
      message: '翻译服务需要API密钥。请联系管理员。',
      action: '联系管理员'
    },
    'Korean': {
      title: 'API 키가 구성되지 않음',
      message: '번역 서비스에는 API 키가 필요합니다. 관리자에게 문의하세요.',
      action: '관리자에게 문의'
    },
    'Vietnamese': {
      title: 'Chưa Cấu Hình API Key',
      message: 'Dịch vụ dịch thuật yêu cầu API key. Vui lòng liên hệ quản trị viên.',
      action: 'Liên hệ quản trị viên'
    },
    'Japanese': {
      title: 'APIキーが設定されていません',
      message: '翻訳サービスにはAPIキーが必要です。管理者にお問い合わせください。',
      action: '管理者に連絡'
    },
    'French': {
      title: 'Clé API Non Configurée',
      message: 'Le service de traduction nécessite une clé API. Veuillez contacter l\'administrateur.',
      action: 'Contacter l\'administrateur'
    },
    'Tagalog': {
      title: 'Hindi Naka-configure ang API Key',
      message: 'Ang serbisyo ng pagsasalin ay nangangailangan ng API key. Pakikipag-ugnayan sa administrator.',
      action: 'Makipag-ugnayan sa administrator'
    }
  },
  [ErrorType.API_KEY_INVALID]: {
    'English': {
      title: 'Invalid API Key',
      message: 'The API key is invalid or expired. Please contact the administrator.',
      action: 'Contact administrator'
    },
    'Spanish': {
      title: 'Clave API Inválida',
      message: 'La clave API es inválida o ha expirado. Por favor, contacte al administrador.',
      action: 'Contactar administrador'
    },
    'Chinese (Simplified)': {
      title: 'API密钥无效',
      message: 'API密钥无效或已过期。请联系管理员。',
      action: '联系管理员'
    },
    'Korean': {
      title: '잘못된 API 키',
      message: 'API 키가 유효하지 않거나 만료되었습니다. 관리자에게 문의하세요.',
      action: '관리자에게 문의'
    },
    'Vietnamese': {
      title: 'API Key Không Hợp Lệ',
      message: 'API key không hợp lệ hoặc đã hết hạn. Vui lòng liên hệ quản trị viên.',
      action: 'Liên hệ quản trị viên'
    },
    'Japanese': {
      title: '無効なAPIキー',
      message: 'APIキーが無効または期限切れです。管理者にお問い合わせください。',
      action: '管理者に連絡'
    },
    'French': {
      title: 'Clé API Invalide',
      message: 'La clé API est invalide ou a expiré. Veuillez contacter l\'administrateur.',
      action: 'Contacter l\'administrateur'
    },
    'Tagalog': {
      title: 'Hindi Wastong API Key',
      message: 'Ang API key ay hindi wasto o nag-expire na. Pakikipag-ugnayan sa administrator.',
      action: 'Makipag-ugnayan sa administrator'
    }
  },
  [ErrorType.TIMEOUT]: {
    'English': {
      title: 'Request Timeout',
      message: 'The request took too long to complete. Please try again.',
      action: 'Try again'
    },
    'Spanish': {
      title: 'Tiempo de Espera Agotado',
      message: 'La solicitud tardó demasiado en completarse. Por favor, intente nuevamente.',
      action: 'Intentar nuevamente'
    },
    'Chinese (Simplified)': {
      title: '请求超时',
      message: '请求花费的时间过长。请重试。',
      action: '重试'
    },
    'Korean': {
      title: '요청 시간 초과',
      message: '요청이 완료되는 데 시간이 너무 오래 걸렸습니다. 다시 시도해주세요.',
      action: '다시 시도'
    },
    'Vietnamese': {
      title: 'Hết Thời Gian Chờ',
      message: 'Yêu cầu mất quá nhiều thời gian để hoàn thành. Vui lòng thử lại.',
      action: 'Thử lại'
    },
    'Japanese': {
      title: 'リクエストタイムアウト',
      message: 'リクエストの完了に時間がかかりすぎました。もう一度お試しください。',
      action: '再試行'
    },
    'French': {
      title: 'Délai d\'Attente Dépassé',
      message: 'La requête a pris trop de temps à se terminer. Veuillez réessayer.',
      action: 'Réessayer'
    },
    'Tagalog': {
      title: 'Timeout ng Request',
      message: 'Ang request ay tumagal nang masyadong mahaba upang makumpleto. Pakisubukan muli.',
      action: 'Subukan muli'
    }
  },
  [ErrorType.RATE_LIMIT]: {
    'English': {
      title: 'Too Many Requests',
      message: 'You have made too many requests. Please wait a moment and try again.',
      action: 'Wait and try again'
    },
    'Spanish': {
      title: 'Demasiadas Solicitudes',
      message: 'Ha realizado demasiadas solicitudes. Por favor, espere un momento e intente nuevamente.',
      action: 'Espere e intente nuevamente'
    },
    'Chinese (Simplified)': {
      title: '请求过多',
      message: '您发送了太多请求。请稍等片刻后重试。',
      action: '等待后重试'
    },
    'Korean': {
      title: '요청이 너무 많음',
      message: '요청을 너무 많이 보냈습니다. 잠시 기다린 후 다시 시도해주세요.',
      action: '기다린 후 다시 시도'
    },
    'Vietnamese': {
      title: 'Quá Nhiều Yêu Cầu',
      message: 'Bạn đã gửi quá nhiều yêu cầu. Vui lòng đợi một chút và thử lại.',
      action: 'Đợi và thử lại'
    },
    'Japanese': {
      title: 'リクエストが多すぎます',
      message: 'リクエストを送信しすぎました。しばらく待ってからもう一度お試しください。',
      action: '待ってから再試行'
    },
    'French': {
      title: 'Trop de Requêtes',
      message: 'Vous avez effectué trop de requêtes. Veuillez attendre un moment et réessayer.',
      action: 'Attendre et réessayer'
    },
    'Tagalog': {
      title: 'Masyadong Maraming Request',
      message: 'Nagpadala ka ng masyadong maraming request. Pakihintay sandali at subukan muli.',
      action: 'Maghintay at subukan muli'
    }
  },
  [ErrorType.UNKNOWN]: {
    'English': {
      title: 'An Error Occurred',
      message: 'Something went wrong. Please try again or contact support if the problem persists.',
      action: 'Try again'
    },
    'Spanish': {
      title: 'Ocurrió un Error',
      message: 'Algo salió mal. Por favor, intente nuevamente o contacte al soporte si el problema persiste.',
      action: 'Intentar nuevamente'
    },
    'Chinese (Simplified)': {
      title: '发生错误',
      message: '出现了问题。请重试，如果问题持续存在，请联系支持。',
      action: '重试'
    },
    'Korean': {
      title: '오류가 발생했습니다',
      message: '문제가 발생했습니다. 다시 시도하거나 문제가 계속되면 지원팀에 문의하세요.',
      action: '다시 시도'
    },
    'Vietnamese': {
      title: 'Đã Xảy Ra Lỗi',
      message: 'Đã xảy ra sự cố. Vui lòng thử lại hoặc liên hệ hỗ trợ nếu vấn đề vẫn tiếp tục.',
      action: 'Thử lại'
    },
    'Japanese': {
      title: 'エラーが発生しました',
      message: '問題が発生しました。もう一度お試しください。問題が続く場合はサポートにお問い合わせください。',
      action: '再試行'
    },
    'French': {
      title: 'Une Erreur s\'est Produite',
      message: 'Quelque chose s\'est mal passé. Veuillez réessayer ou contacter le support si le problème persiste.',
      action: 'Réessayer'
    },
    'Tagalog': {
      title: 'May Naganap na Error',
      message: 'May naganap na problema. Pakisubukan muli o makipag-ugnayan sa suporta kung patuloy ang problema.',
      action: 'Subukan muli'
    }
  }
};

/**
 * Get user-friendly error message based on error type and language
 */
export const getErrorMessage = (
  errorType: ErrorType,
  language: SupportedLanguage = 'English'
): ErrorMessage => {
  return errorMessages[errorType][language] || errorMessages[errorType]['English'];
};

/**
 * Detect error type from error object
 */
export const detectErrorType = (error: unknown): ErrorType => {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    
    if (message.includes('api key') || message.includes('api_key')) {
      if (message.includes('not found') || message.includes('missing')) {
        return ErrorType.API_KEY_MISSING;
      }
      return ErrorType.API_KEY_INVALID;
    }
    
    if (message.includes('timeout') || message.includes('timed out')) {
      return ErrorType.TIMEOUT;
    }
    
    if (message.includes('rate limit') || message.includes('too many')) {
      return ErrorType.RATE_LIMIT;
    }
    
    if (message.includes('network') || message.includes('fetch') || message.includes('connection')) {
      return ErrorType.NETWORK_ERROR;
    }
  }
  
  return ErrorType.UNKNOWN;
};

