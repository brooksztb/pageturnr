export interface Book {
  id: string
  title: string
  authors: Array<string>
  isbns: Array<string>
  page_count: number
  thumbnail: string
  stats?: BookStats
  entries?: Array<BookEntry>
}

export interface BookEntry {
  id: string
  date: Date
  minutes: number
  pages: number
}

export interface BookStats {
  id: string
  pages_read: number
  read_mintes: number
  pages_per_minute: number
  minutes_to_complete: number
  completion_percentage: number
}
