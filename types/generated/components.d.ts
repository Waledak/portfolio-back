import type { Schema, Struct } from '@strapi/strapi';

export interface AtomTag extends Struct.ComponentSchema {
  collectionName: 'components_atom_tags';
  info: {
    description: '';
    displayName: 'tag';
    icon: 'cloud';
  };
  attributes: {
    name: Schema.Attribute.String;
  };
}

export interface CardSkill extends Struct.ComponentSchema {
  collectionName: 'components_card_skills';
  info: {
    description: '';
    displayName: 'skill';
    icon: 'book';
  };
  attributes: {
    logo: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    tags: Schema.Attribute.Component<'atom.tag', true> &
      Schema.Attribute.Required;
  };
}

export interface MediaFileItem extends Struct.ComponentSchema {
  collectionName: 'components_media_file_items';
  info: {
    description: '';
    displayName: 'file-item';
    icon: 'file';
  };
  attributes: {
    file: Schema.Attribute.Media<'files'> & Schema.Attribute.Required;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
  };
}

export interface MoleculeContactLink extends Struct.ComponentSchema {
  collectionName: 'components_molecule_contact_links';
  info: {
    displayName: 'contactLink';
    icon: 'globe';
  };
  attributes: {
    logo: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'atom.tag': AtomTag;
      'card.skill': CardSkill;
      'media.file-item': MediaFileItem;
      'molecule.contact-link': MoleculeContactLink;
    }
  }
}
