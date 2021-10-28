export interface TopicsFeed {
  createdAt: string;
  eventData: {
    createdAt: string;
    entityId: string;
    entityName: string;
    entityType: string;
    eventType: number;
    id: number;
    state: number;
    topicId: string;
    updatedAt: string;
  }[];
  extra: {
    instantView: boolean;
  };
  hasInstantView: boolean;
  id: string;
  newsArray: {
    autherName: string;
    duplicateId: number;
    hasInstantView: boolean;
    id: number;
    language: string;
    mobileUrl: string;
    publishDate: string;
    siteName: string;
    statementType: number;
    title: string;
    url: string;
  }[];
  order: number;
  publishDate: string;
  summary: string;
  timeline: string;
  title: string;
  updatedAt: string;
}

export interface NewsFeed {
  authorName: string;
  id: number;
  language: string;
  mobileUrl: string;
  publishDate: string;
  siteName: string;
  summary: string;
  summaryAuto: string;
  title: string;
  url: string;
}

export interface TechnewsFeed extends NewsFeed {}

export interface NewsArray {
  autherName: string;
  duplicateId: number;
  hasInstantView: boolean;
  id: string;
  language: string;
  mobileUrl: string;
  publishDate: string;
  siteName: string;
  statementType: number;
  title: string;
  url: string;
}

export interface Topics {
  createdAt: string;
  id: string;
  title: string;
}

export interface Detail {
  createdAt: string;
  entityEventTopics: {
    entityId: string;
    entityName: string;
    entityType: string;
    eventType: number;
    eventTypeLabel: string;
  }[];
  entityTopics: {
    entityId: string;
    entityName: string;
    entityType: string;
    finance: {
      code: string;
      name: string;
    };
    nerName: string;
  }[];
  hasInstantView: true;
  id: string;
  instantViewNewsId: string;
  newsArray: NewsArray[];
  order: number;
  publishDate: string;
  summary: string;
  tags: {
    name: string;
    uid: string;
  }[];
  timeline: {
    commonEntities: {
      reatedAt: string;
      deleted: boolean;
      entityId: string;
      entityName: string;
      entityType: string;
      extra: {
        finance: {
          bussiness: string;
          code: string;
          exchange: string;
          name: string;
          state: number;
        };
      };
      id: number;
      isMain: boolean;
      nerName: string;
      topicId: string;
      updatedAt: string;
      weight: number;
    }[];
    topics: Topics[];
  };
  timelineId: string;
  title: string;
  updatedAt: string;
}

export interface InstantState {
  content: string;
  siteName: string;
  title: string;
  url: string;
}

export interface SettingsItem {
  title: string;
  leftIcon: string;
  leftIconSize?: number;
  rightIcon: string;
  rightIconSize?: number;
  description?: string;
  onPress: () => void;
}

export interface SearchReault {
  hasTimeline: boolean;
  key: number;
  newsList: {
    hasInstantView: boolean;
    hidden: boolean;
    id: string;
    isShow: boolean;
    publishDate: string;
    siteName: string;
    summary: string;
    title: string;
    url: string;
  }[];
  topicCreateAt: string;
  topicId: string;
  topicState: number;
  topicSummary: string;
  topicTitle: string;
}

export interface SuggestItem {
  entityId: string;
  entityName: string;
  entityType: string;
  text: string;
  type: string;
}
