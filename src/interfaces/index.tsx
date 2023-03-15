export interface GetCards {
  id: number;
  videoUuidSlug: string;
  durationTime: string;
  title: string;
  thumbnailSprite: {
    sprite: string;
  };
  views: {
    viewsCount: string;
  };
  likes: {
    likesCount: string;
  };
}

export interface RandomData {
  [x: string]: any;
  createdAt: Date;
  description: string;
  durationTime: string;
  id: number;
  likesCount: string;
  sprite: string;
  title: string;
  videoId: number;
  videoUrl: string;
  videoUuidSlug: string;
  viewsCount: string;
}

export interface NavSliderCategory {
  id: number;
  name: string;
}
