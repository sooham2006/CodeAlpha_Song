const CLIENT_ID = 'b0ac0b46';
const BASE_URL = 'https://api.jamendo.com/v3.0';

export class JamendoAPI {
  private static instance: JamendoAPI;
  
  static getInstance(): JamendoAPI {
    if (!JamendoAPI.instance) {
      JamendoAPI.instance = new JamendoAPI();
    }
    return JamendoAPI.instance;
  }

  private async request<T>(endpoint: string, params: Record<string, string | number> = {}): Promise<T> {
    const searchParams = new URLSearchParams({
      client_id: CLIENT_ID,
      format: 'json',
      limit: '20',
      ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)]))
    });

    const response = await fetch(`${BASE_URL}${endpoint}?${searchParams}`);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }
    
    return response.json();
  }

  async getPopularTracks(limit = 20) {
    return this.request('/tracks', {
      order: 'popularity_total',
      include: 'musicinfo',
      audioformat: 'mp31',
      limit
    });
  }

  async searchTracks(query: string, limit = 20) {
    return this.request('/tracks', {
      search: query,
      include: 'musicinfo',
      audioformat: 'mp31',
      limit
    });
  }

  async getTracksByGenre(genre: string, limit = 20) {
    return this.request('/tracks', {
      tags: genre,
      include: 'musicinfo',
      audioformat: 'mp31',
      limit
    });
  }

  async getAlbums(limit = 20) {
    return this.request('/albums', {
      order: 'popularity_total',
      imagesize: '300',
      limit
    });
  }

  async getArtists(limit = 20) {
    return this.request('/artists', {
      order: 'popularity_total',
      imagesize: '300',
      limit
    });
  }

  async getRadioTracks(id: string = '9') {
    return this.request('/radios/stream', {
      id,
      include: 'musicinfo',
      audioformat: 'mp31'
    });
  }
}