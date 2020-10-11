using System.ComponentModel;

namespace netCoreMongoDbApi.Domain.Models
{
    public enum ESemester : byte
    {
        [Description("I")]
        First = 1,

        [Description("II")]
        Second = 2,

        [Description("III")]
        Third = 3,

        [Description("IV")]
        Fourth = 4,

        [Description("V")]
        Fifth = 5,

        [Description("VI")]
        Sixth = 6,

        [Description("VII")]
        Seventh = 7,

        [Description("VIII")]
        Eighth = 8,

        [Description("IX")]
        Ninth = 9,

        [Description("X")]
        Tenth = 10,

        [Description("XI")]
        Eleventh = 11,

        [Description("XII")]
        Twelfth = 12,
    }
}